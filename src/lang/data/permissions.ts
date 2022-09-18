import { RolesNames } from '../../role/data/roles';
import { CreatePermissionDto } from '../../role/dto/create-permission.dto';

export enum PermissionsNames {
  CREATE_LANG = 'create_lang',
  UPDATE_LANG = 'update_lang',
  DELETE_LANG = 'delete_lang',
  CREATE_LEXEME = 'create_lexeme',
  UPDATE_LEXEME = 'update_lexeme',
  DELETE_LEXEME = 'delete_lexeme',
  CREATE_TRANSLATION = 'create_translation',
  UPDATE_TRANSLATION = 'update_translation',
  DELETE_TRANSLATION = 'delete_translation',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.CREATE_LANG,
      title: 'Create lang',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_LANG,
      title: 'Update lang',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.DELETE_LANG,
      title: 'Delete lang',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.CREATE_LEXEME,
      title: 'Create lexeme',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_LEXEME,
      title: 'Update lexeme',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.DELETE_LEXEME,
      title: 'Delete lexeme',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.CREATE_TRANSLATION,
      title: 'Create translation',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_TRANSLATION,
      title: 'Update translation',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.DELETE_TRANSLATION,
      title: 'Delete translation',
      roles: [RolesNames.ADMIN],
    },
  ];
