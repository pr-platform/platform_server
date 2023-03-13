import { CreateRoleDto } from '../dto/create-role.dto';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { RolesNames } from '../data/roles';

export const getRolePermissionCollaborateFromData = (
  roles: CreateRoleDto[],
  permissions: Array<CreatePermissionDto & { roles: RolesNames[] }>,
) => {
  const rolePermissions = [];

  permissions.forEach((permission) => {
    permission.roles.forEach((roleName) => {
      const existPermissionRole = rolePermissions.find(
        (rolePermission) => rolePermission.role.alias === roleName,
      );

      if (existPermissionRole) {
        existPermissionRole.permissions.push({
          alias: permission.alias,
          title: permission.title,
          lexeme: permission.lexeme,
        });
      } else {
        rolePermissions.push({
          role: roles.find((role) => role.alias === roleName),
          permissions: [
            {
              alias: permission.alias,
              title: permission.title,
              lexeme: permission.lexeme,
            },
          ],
        });
      }
    });
  });

  return rolePermissions;
};
