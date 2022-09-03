import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'permissions';
export const Permissions = (...permissions) =>
  SetMetadata(ROLES_KEY, permissions);
