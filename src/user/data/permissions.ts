import { RolesNames } from '../../role/data/roles';
import { CreatePermissionDto } from '../../role/dto/create-permission.dto';

export enum PermissionsNames {
  CREATE_USERS = 'user:create_user',
  UPDATE_USERS = 'user:update_user',
  READ_USERS = 'user:read_user',
  DELETE_USERS = 'vdelete_user',
  BLOCK_USERS = 'user:block_user',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.CREATE_USERS,
      title: 'Create users',
      lexeme: 'Create_users',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_USERS,
      title: 'Update users',
      lexeme: 'Update_users',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.READ_USERS,
      title: 'Read users',
      lexeme: 'Read_users',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.DELETE_USERS,
      title: 'Remove users',
      lexeme: 'Remove_users',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.BLOCK_USERS,
      title: 'Block users',
      lexeme: 'Block_users',
      roles: [RolesNames.ADMIN],
    },
  ];
