import { CreateRoleDto } from '../dto/create-role.dto';

export enum RolesNames {
  DEFAULT = 'default',
  ADMIN = 'admin',
  BLOCKED = 'blocked',
}

export const roles: CreateRoleDto[] = [
  {
    alias: RolesNames.DEFAULT,
    title: 'Default',
  },
  {
    alias: RolesNames.ADMIN,
    title: 'Admin',
  },
  {
    alias: RolesNames.BLOCKED,
    title: 'Blocked',
  },
];
