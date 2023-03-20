import { RolesNames } from './roles';
import { CreatePermissionDto } from '../dto/create-permission.dto';

export enum PermissionsNames {
  CREATE_ROLES = 'role:create_role',
  UPDATE_ROLES = 'role:update_role',
  READ_ROLES = 'role:read_role',
  DELETE_ROLES = 'role:delete_role',
  CHANGE_PERMISSIONS = 'role:change_permissions',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.CREATE_ROLES,
      name: 'Create roles',
      lexeme: 'Create_role',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_ROLES,
      name: 'Update roles',
      lexeme: 'Update_role',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.READ_ROLES,
      name: 'Read roles',
      lexeme: 'Read_role',
      roles: [RolesNames.ADMIN, RolesNames.DEFAULT],
    },
    {
      alias: PermissionsNames.DELETE_ROLES,
      name: 'Remove roles',
      lexeme: 'Remove_role',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.CHANGE_PERMISSIONS,
      name: 'Change permissions',
      lexeme: 'Change_permissions',
      roles: [RolesNames.ADMIN],
    },
  ];
