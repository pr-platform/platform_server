import { RolesNames } from '../../role/data/roles';
import { CreatePermissionDto } from '../../role/dto/create-permission.dto';

export enum PermissionsNames {
  SEND_EMAIL = 'mail:send_email',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.SEND_EMAIL,
      title: 'Send email',
      lexeme: 'Send_email',
      roles: [RolesNames.ADMIN],
    },
  ];
