import { Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesNames } from '../data/roles';
import { ContextTypes } from 'src/types';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: any | ExecutionContextHost): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesNames[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const contextType = (context as any).contextType as string;

    let user;

    if (contextType === ContextTypes.GRAPHQL) {
      user = GqlExecutionContext.create(context).getContext()?.req?.user;
    } else if (contextType === ContextTypes.WS) {
      user = context.switchToWs().getRequest()?.handshake?.user;
    } else {
      user = context.switchToHttp().getRequest()?.user;
    }

    return !!requiredRoles.find(
      (role) => user.role?.alias === role.toLowerCase(),
    );
  }
}
