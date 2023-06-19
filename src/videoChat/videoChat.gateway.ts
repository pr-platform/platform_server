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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../role/guards/permission.guard';
import { VerifiedGuard } from '../user/guard/verified.guard';
import { BlockedGuard } from '../user/guard/blocked.guard';
import { Permissions } from '../role/decorators/permission.decorator';
import { PermissionsNames } from './data/permissions';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoChatGateway implements OnGatewayDisconnect {
  private roomId = '';

  private users = [];

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

    this.users = this.users.filter((user) => user.clientId !== socket.id);

    Array.from(rooms)
      .filter((roomId) => validate(roomId) && version(roomId) === 4)
      .forEach((roomId) => socket.leave(roomId));

    socket.broadcast.in(this.roomId).emit(ACTIONS.REMOVE_PEER, {
      peerId: socket.id,
    });

    this.shareRoomsInfo();
  }

  @Permissions(PermissionsNames.GET_ROOM)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @SubscribeMessage(ACTIONS.SHARE_ROOMS)
  getRooms() {
    return {
      rooms: this.getClientsRooms(),
    };
  }

  @Permissions(
    PermissionsNames.GET_ROOM,
    PermissionsNames.CREATE_ROOM,
    PermissionsNames.JOIN_ROOM,
  )
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @SubscribeMessage(ACTIONS.JOIN)
  join(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    if (validate(data.roomId) && version(data.roomId) === 4) {
      const user = (socket.handshake as any).user;

      const existUser = this.users.find((user) => user.user.id === user.id);

      if (!existUser) {
        this.roomId = data.roomId;
        this.users.push({
          clientId: socket.id,
          user: {
            id: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
          },
        });
      }
    }

    const joinedRooms = socket.rooms;

    if (Array.from(joinedRooms).includes(this.roomId)) {
      return console.warn(`Already joined to room ${this.roomId}`);
    }

    socket.broadcast.in(this.roomId).emit(ACTIONS.ADD_PEER, {
      peerId: socket.id,
      user: this.users.find((user) => user.clientId === socket.id)?.user,
    });

    const clients = Array.from(
      this.io.sockets.adapter.rooms.get(this.roomId) || [],
    );

    clients.forEach((clientId) => {
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: this.users.find((user) => user.clientId === clientId)?.user,
      });
    });

    socket.join(this.roomId);
    this.shareRoomsInfo();
  }

  @Permissions(PermissionsNames.CREATE_ROOM, PermissionsNames.JOIN_ROOM)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @SubscribeMessage(ACTIONS.LEAVE)
  leave(@ConnectedSocket() socket: Socket) {
    this.leaveRoom(socket);
  }

  @Permissions(PermissionsNames.CREATE_ROOM, PermissionsNames.JOIN_ROOM)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @SubscribeMessage(ACTIONS.RELAY_SDP)
  relaySdp(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    this.io.to(data.peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription: data.sessionDescription,
    });
  }

  @Permissions(PermissionsNames.CREATE_ROOM, PermissionsNames.JOIN_ROOM)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @SubscribeMessage(ACTIONS.RELAY_ICE)
  relayIce(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    this.io.to(data.peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      iceCandidate: data.iceCandidate,
    });
  }
}
