import { RolesNames } from '../../role/data/roles';
import { CreatePermissionDto } from '../../role/dto/create-permission.dto';

export enum PermissionsNames {
  CREATE_LANG = 'lang:create_lang',
  UPDATE_LANG = 'lang:update_lang',
  DELETE_LANG = 'lang:delete_lang',
  CREATE_LEXEME = 'lang:create_lexeme',
  UPDATE_LEXEME = 'lang:update_lexeme',
  DELETE_LEXEME = 'lang:delete_lexeme',
  CREATE_TRANSLATION = 'lang:create_translation',
  UPDATE_TRANSLATION = 'lang:update_translation',
  DELETE_TRANSLATION = 'lang:delete_translation',
}

export const permissions: Array<CreatePermissionDto & { roles: RolesNames[] }> =
  [
    {
      alias: PermissionsNames.CREATE_LANG,
      title: 'Create lang',
      lexeme: 'Create_lang',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_LANG,
      title: 'Update lang',
      lexeme: 'Update_lang',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.DELETE_LANG,
      title: 'Delete lang',
      lexeme: 'Delete_lang',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.CREATE_LEXEME,
      title: 'Create lexeme',
      lexeme: 'Create_lexeme',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_LEXEME,
      title: 'Update lexeme',
      lexeme: 'Update_lexeme',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.DELETE_LEXEME,
      title: 'Delete lexeme',
      lexeme: 'Delete_lexeme',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.CREATE_TRANSLATION,
      title: 'Create translation',
      lexeme: 'Create_translation',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.UPDATE_TRANSLATION,
      title: 'Update translation',
      lexeme: 'Update_translation',
      roles: [RolesNames.ADMIN],
    },
    {
      alias: PermissionsNames.DELETE_TRANSLATION,
      title: 'Delete translation',
      lexeme: 'Delete_translation',
      roles: [RolesNames.ADMIN],
    },
  ];
