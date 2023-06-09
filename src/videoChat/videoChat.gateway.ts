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
  handleConnection() {
    this.shareRoomsInfo();
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.leaveRoom(client);
  }

  @WebSocketServer()
  server: Server;

  private getClientsRooms() {
    const { rooms } = this.server.sockets.adapter;

    return Array.from(rooms.keys()).filter(
      (roomId) => validate(roomId) && version(roomId) === 4,
    );
  }

  private shareRoomsInfo() {
    this.server.emit(ACTIONS.SHARE_ROOMS, {
      rooms: this.getClientsRooms(),
    });
  }

  private leaveRoom(client) {
    const { rooms } = client;

    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(
        this.server.sockets.adapter.rooms.get(roomId as string) || [],
      );

      clients.forEach((clientId) => {
        this.server.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerID: client.id,
        });

        client.emit(ACTIONS.REMOVE_PEER, {
          peerID: clientId,
        });
      });

      client.leave(roomId);
    });

    this.shareRoomsInfo();
  }

  @SubscribeMessage(ACTIONS.JOIN)
  join(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const roomId = data.roomId;
    const joinedRooms = client.rooms;

    if (Array.from(joinedRooms).includes(roomId)) {
      return console.warn(`Already joined to room ${roomId}`);
    }

    const clients = Array.from(
      this.server.sockets.adapter.rooms.get(roomId) || [],
    );

    clients.forEach((clientId) => {
      this.server.to(clientId as any).emit(ACTIONS.ADD_PEER, {
        peerID: client.id,
        createOffer: false,
      });

      client.emit(ACTIONS.ADD_PEER, {
        peerID: clientId,
        createOffer: true,
      });
    });

    client.join(roomId);
    this.shareRoomsInfo();
  }

  @SubscribeMessage(ACTIONS.LEAVE)
  leave(@ConnectedSocket() client: Socket) {
    this.leaveRoom(client);
  }
}
