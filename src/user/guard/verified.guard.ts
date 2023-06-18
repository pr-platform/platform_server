import { Injectable, CanActivate } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ContextTypes } from 'src/types';

@Injectable()
export class VerifiedGuard implements CanActivate {
  canActivate(context: any | ExecutionContextHost): boolean {
    const contextType = (context as any).contextType as string;

    let user;

    if (contextType === ContextTypes.GRAPHQL) {
      user = GqlExecutionContext.create(context).getContext()?.req?.user;
    } else if (contextType === ContextTypes.WS) {
      user = context.switchToWs().getRequest()?.handshake?.user;
    } else {
      user = context.switchToHttp().getRequest()?.user;
    }

    return user?.verified;
  }
}
