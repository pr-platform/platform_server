import { PermissionsNames, RolesNames } from '../../role/types';

export const permissions = [
  {
    alias: PermissionsNames.CREATE_USERS,
    title: 'Create users',
    roles: [RolesNames.ADMIN],
  },
  {
    alias: PermissionsNames.UPDATE_USERS,
    title: 'Update users',
    roles: [RolesNames.ADMIN],
  },
  {
    alias: PermissionsNames.READ_USERS,
    title: 'Read users',
    roles: [RolesNames.ADMIN],
  },
  {
    alias: PermissionsNames.REMOVE_USERS,
    title: 'Remove users',
    roles: [RolesNames.ADMIN],
  },
  {
    alias: PermissionsNames.BLOCK_USERS,
    title: 'Block users',
    roles: [RolesNames.ADMIN],
  },
];
