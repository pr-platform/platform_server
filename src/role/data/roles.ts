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
    name: 'Default',
  },
  {
    alias: RolesNames.ADMIN,
    lexeme: 'Admin',
    name: 'Admin',
  },
  {
    alias: RolesNames.BLOCKED,
    lexeme: 'Blocked',
    name: 'Blocked',
  },
];
