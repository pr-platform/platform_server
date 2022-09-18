import { RolesNames } from '../../role/data/roles';

export enum PermissionsNames {
  CREATE_USERS = 'create_user',
  UPDATE_USERS = 'update_user',
  READ_USERS = 'read_user',
  DELETE_USERS = 'delete_user',
  BLOCK_USERS = 'block_user',
}

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
    alias: PermissionsNames.DELETE_USERS,
    title: 'Remove users',
    roles: [RolesNames.ADMIN],
  },
  {
    alias: PermissionsNames.BLOCK_USERS,
    title: 'Block users',
    roles: [RolesNames.ADMIN],
  },
];
