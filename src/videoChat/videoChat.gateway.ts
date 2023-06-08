import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ACTIONS } from './variables';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('test-event')
  testEvent(@MessageBody() data: any) {
    console.log(data);
    return {
      message: 'Test',
    };
  }

  private getClientsRooms() {
    const { rooms } = this.server.sockets.adapter;

    return Array.from(rooms.keys());
  }

  private shareRoomsInfo() {
    this.server.emit(ACTIONS.SHARE_ROOMS, {
      rooms: this.getClientsRooms(),
    });
  }

  @SubscribeMessage('test-on')
  join(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const roomId = data.roomId;
    const joinedRooms = client.rooms;

    if (Array.from(joinedRooms).includes(roomId)) {
      return console.warn(`Already joined to room ${roomId}`);
    }

    console.log('rooms', this.server.sockets.adapter.rooms);

    const clients = Array.from(
      this.server.sockets.adapter.rooms.get(roomId) || [],
    );

    console.log('clients', clients);

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

    function leaveRoom() {
      const { rooms } = client;

      Array.from(rooms).forEach((roomId) => {
        const clients = Array.from(this.server.adapter.rooms.get(roomId) || []);

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

    client.on(ACTIONS.LEAVE, leaveRoom);
    client.on('disconnecting', leaveRoom);
  }
}
