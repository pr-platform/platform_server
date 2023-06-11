import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ACTIONS } from './variables';
import { version, validate } from 'uuid';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoChatGateway implements OnGatewayDisconnect {
  private roomId = '';

  handleConnection() {
    this.shareRoomsInfo();
  }

  handleDisconnect(socket: Socket) {
    this.leaveRoom(socket);
  }

  @WebSocketServer()
  io: Server;

  private getClientsRooms() {
    const { rooms } = this.io.sockets.adapter;

    return Array.from(rooms.keys()).filter(
      (roomId) => validate(roomId) && version(roomId) === 4,
    );
  }

  private shareRoomsInfo() {
    this.io.emit(ACTIONS.SHARE_ROOMS, {
      rooms: this.getClientsRooms(),
    });
  }

  private leaveRoom(socket) {
    const { rooms } = socket;

    Array.from(rooms)
      .filter((roomId) => validate(roomId) && version(roomId) === 4)
      .forEach((roomId) => socket.leave(roomId));

    socket.broadcast.in(this.roomId).emit(ACTIONS.REMOVE_PEER, {
      peerId: socket.id,
    });

    this.shareRoomsInfo();
  }

  @SubscribeMessage(ACTIONS.JOIN)
  join(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    this.roomId = data.roomId;
    const joinedRooms = socket.rooms;

    if (Array.from(joinedRooms).includes(this.roomId)) {
      return console.warn(`Already joined to room ${this.roomId}`);
    }

    const clients = Array.from(
      this.io.sockets.adapter.rooms.get(this.roomId) || [],
    );

    clients.forEach((clientId) => {
      this.io.to(clientId as any).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
      });

      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
      });
    });

    socket.join(this.roomId);
    this.shareRoomsInfo();
  }

  @SubscribeMessage(ACTIONS.LEAVE)
  leave(@ConnectedSocket() socket: Socket) {
    this.leaveRoom(socket);
  }

  @SubscribeMessage(ACTIONS.RELAY_SDP)
  relaySdp(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    this.io.to(data.peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription: data.sessionDescription,
    });
  }

  @SubscribeMessage(ACTIONS.RELAY_ICE)
  relayIce(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    this.io.to(data.peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      iceCandidate: data.iceCandidate,
    });
  }
}
