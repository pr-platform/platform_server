import { RolesNames } from './roles';
import { CreatePermissionDto } from '../dto/create-permission.dto';

export enum PermissionsNames {
  CREATE_ROLES = 'create_role',
  UPDATE_ROLES = 'update_role',
  READ_ROLES = 'read_role',
  DELETE_ROLES = 'delete_role',
  CHANGE_PERMISSIONS = 'change_permissions',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.CREATE_ROLES,
      title: 'Create roles',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_ROLES,
      title: 'Update roles',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.READ_ROLES,
      title: 'Read roles',
      roles: [RolesNames.ADMIN, RolesNames.DEFAULT],
    },
    {
      alias: PermissionsNames.DELETE_ROLES,
      title: 'Remove roles',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.CHANGE_PERMISSIONS,
      title: 'Change permissions',
      roles: [RolesNames.ADMIN],
    },
  ];
