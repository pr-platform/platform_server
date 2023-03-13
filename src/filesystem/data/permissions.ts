import { RolesNames } from '../../role/data/roles';
import { CreatePermissionDto } from '../../role/dto/create-permission.dto';

export enum PermissionsNames {
  UPLOAD_FILE = 'filesystem:upload_file',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.UPLOAD_FILE,
      title: 'Upload file',
      lexeme: 'Upload_file',
      roles: [RolesNames.ADMIN, RolesNames.DEFAULT],
    },
  ];
