import { RolesNames } from '../../role/data/roles';
import { CreatePermissionDto } from '../../role/dto/create-permission.dto';

export enum PermissionsNames {
  SEND_SMS = 'send_sms',
  SEND_EMAIL = 'send_email_smsc',
  SEND_MMS = 'send_mms_smsc',
  GET_BALANCE = 'get_balance_smsc',
  GET_SMS_STATUS = 'get_status_smsc',
  GET_SMS_COST = 'get_sms_cost',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.SEND_SMS,
      title: 'Send sms',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.SEND_EMAIL,
      title: 'Send email',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.SEND_MMS,
      title: 'Send mms',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.GET_BALANCE,
      title: 'Get balance',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.GET_SMS_STATUS,
      title: 'Get sms status',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.GET_SMS_COST,
      title: 'Get sms cost',
      roles: [RolesNames.ADMIN],
    },
  ];
