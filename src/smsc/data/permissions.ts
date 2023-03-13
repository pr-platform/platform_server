import { RolesNames } from '../../role/data/roles';
import { CreatePermissionDto } from '../../role/dto/create-permission.dto';

export enum PermissionsNames {
  SEND_SMS = 'smsc:send_sms',
  SEND_EMAIL = 'smsc:send_email',
  SEND_MMS = 'smsc:send_mms',
  GET_BALANCE = 'smsc:get_balance',
  GET_SMS_STATUS = 'smsc:get_status',
  GET_SMS_COST = 'smsc:get_sms_cost',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.SEND_SMS,
      title: 'Send sms',
      lexeme: 'Send_sms',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.SEND_EMAIL,
      title: 'Send email',
      lexeme: 'Send_email',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.SEND_MMS,
      title: 'Send mms',
      lexeme: 'Send_mms',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.GET_BALANCE,
      title: 'Get balance',
      lexeme: 'Get_balance',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.GET_SMS_STATUS,
      title: 'Get sms status',
      lexeme: 'Get_sms_status',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.GET_SMS_COST,
      title: 'Get sms cost',
      lexeme: 'Get_sms_cost',
      roles: [RolesNames.ADMIN],
    },
  ];
