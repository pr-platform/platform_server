import { CreateRoleDto } from '../dto/create-role.dto';

export enum RolesNames {
  DEFAULT = 'default',
  ADMIN = 'admin',
  BLOCKED = 'blocked',
}

export const roles: CreateRoleDto[] = [
  {
    alias: RolesNames.DEFAULT,
    lexeme: 'Default',
    title: 'Default',
  },
  {
    alias: RolesNames.ADMIN,
    lexeme: 'Admin',
    title: 'Admin',
  },
  {
    alias: RolesNames.BLOCKED,
    lexeme: 'Blocked',
    title: 'Blocked',
  },
];
