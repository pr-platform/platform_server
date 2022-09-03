import { Roles, Permissions } from '../types';
import { permissions as userPermissions } from '../../user/data/permissions';

export const permissions = [
  {
    alias: Permissions.CREATE_ROLES,
    title: 'Create roles',
    roles: [Roles.ADMIN],
  },
  {
    alias: Permissions.UPDATE_ROLES,
    title: 'Update roles',
    roles: [Roles.ADMIN],
  },
  {
    alias: Permissions.READ_ROLES,
    title: 'Read roles',
    roles: [Roles.ADMIN, Roles.DEFAULT],
  },
  {
    alias: Permissions.REMOVE_ROLES,
    title: 'Remove roles',
    roles: [Roles.ADMIN],
  },
  {
    alias: Permissions.CHANGE_PERMISSIONS,
    title: 'Change permissions',
    roles: [Roles.ADMIN],
  },
  ...userPermissions,
];
