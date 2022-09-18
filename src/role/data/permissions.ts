import { RolesNames, PermissionsNames } from '../types';
import { CreatePermissionDto } from '../dto/create-permission.dto';

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
      alias: PermissionsNames.REMOVE_ROLES,
      title: 'Remove roles',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.CHANGE_PERMISSIONS,
      title: 'Change permissions',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.CHANGE_PERMISSIONS,
      title: 'Change permissions',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.BLOCKED_ALL,
      title: 'Blocked all',
      roles: [RolesNames.BLOCKED],
    },
  ];
