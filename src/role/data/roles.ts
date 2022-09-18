import { RolesNames } from '../types';
import { CreateRoleDto } from '../dto/create-role.dto';

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
