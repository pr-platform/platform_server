import { RolesNames, PermissionsNames } from '../types';
import { permissions as userPermissions } from '../../user/data/permissions';

export const permissions = [
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
  ...userPermissions,
];
