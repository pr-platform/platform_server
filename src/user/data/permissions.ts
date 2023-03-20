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
      name: 'Create users',
      lexeme: 'Create_users',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_USERS,
      name: 'Update users',
      lexeme: 'Update_users',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.READ_USERS,
      name: 'Read users',
      lexeme: 'Read_users',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.DELETE_USERS,
      name: 'Remove users',
      lexeme: 'Remove_users',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.BLOCK_USERS,
      name: 'Block users',
      lexeme: 'Block_users',
      roles: [RolesNames.ADMIN],
    },
  ];
