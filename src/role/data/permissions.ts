import { permissions as userPermissions } from '../../user/data/permissions';

export const permissions = [
  {
    alias: 'create_roles',
    title: 'Create roles',
    roles: ['admin'],
  },
  {
    alias: 'update_roles',
    title: 'Update roles',
    roles: ['admin'],
  },
  {
    alias: 'read_roles',
    title: 'Read roles',
    roles: ['admin', 'default'],
  },
  {
    alias: 'remove_roles',
    title: 'Remove roles',
    roles: ['admin'],
  },
  {
    alias: 'change_permissions',
    title: 'Change permissions',
    roles: ['admin'],
  },
  ...userPermissions,
];
