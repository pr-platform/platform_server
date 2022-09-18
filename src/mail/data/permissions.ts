import { RolesNames } from '../../role/data/roles';

export enum PermissionsNames {
  SEND_EMAIL = 'send_email',
}

export const permissions = [
  {
    alias: PermissionsNames.SEND_EMAIL,
    title: 'Send email',
    roles: [RolesNames.ADMIN],
  },
];
