import { RolesNames, PermissionsNames } from '../../role/types';

export const permissions = [
  {
    alias: PermissionsNames.SEND_EMAIL,
    title: 'Send email',
    roles: [RolesNames.ADMIN],
  },
];
