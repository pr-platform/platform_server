import { Permissions, Roles } from '../../role/types';

export const permissions = [
  {
    alias: Permissions.CREATE_USERS,
    title: 'Create users',
    roles: [Roles.ADMIN],
  },
  {
    alias: Permissions.UPDATE_USERS,
    title: 'Update users',
    roles: [Roles.ADMIN],
  },
  {
    alias: Permissions.READ_USERS,
    title: 'Read users',
    roles: [Roles.ADMIN],
  },
  {
    alias: Permissions.REMOVE_USERS,
    title: 'Remove users',
    roles: [Roles.ADMIN],
  },
  {
    alias: Permissions.BLOCK_USERS,
    title: 'Block users',
    roles: [Roles.ADMIN],
  },
];
