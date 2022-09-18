import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesNames } from '../data/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesNames[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return !!requiredRoles.find(
      (role) => user.role?.alias === role.toLowerCase(),
    );
  }
}
