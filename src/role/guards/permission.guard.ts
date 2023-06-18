import { Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { PermissionsNames } from '../data/permissions';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ContextTypes } from 'src/types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: any | ExecutionContextHost): boolean {
    const contextType = (context as any).contextType as string;

    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionsNames[]
    >('permissions', [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    let user;

    if (contextType === ContextTypes.GRAPHQL) {
      user = GqlExecutionContext.create(context).getContext()?.req?.user;
    } else if (contextType === ContextTypes.WS) {
      user = context.switchToWs().getRequest()?.handshake?.user;
    } else {
      user = context.switchToHttp().getRequest()?.user;
    }

    return requiredPermissions.some((permission) =>
      user.role?.permissions.find(
        (userPermission) => userPermission.alias === permission.toLowerCase(),
      ),
    );
  }
}
