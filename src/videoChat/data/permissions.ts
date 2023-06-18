import { CreatePermissionDto } from '../../role/dto/create-permission.dto';
import { RolesNames } from '../../role/data/roles';

export enum PermissionsNames {
  CREATE_ROOM = 'video-chat:create_room',
  GET_ROOM = 'video-chat:get_room',
  JOIN_ROOM = 'video-chat:join_room',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.CREATE_ROOM,
      name: 'Create room',
      lexeme: 'Create_room',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.GET_ROOM,
      name: 'Reed room',
      lexeme: 'Create_room',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.JOIN_ROOM,
      name: 'Join room',
      lexeme: 'Join_room',
      roles: [RolesNames.ADMIN],
    },
  ];
