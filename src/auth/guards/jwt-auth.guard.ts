import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ContextTypes } from 'src/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext | ExecutionContextHost) {
    if ((context as any).contextType === ContextTypes.GRAPHQL) {
      const ctx = GqlExecutionContext.create(context);

      return ctx.getContext().req;
    } else if ((context as any).contextType === ContextTypes.WS) {
      return context.switchToWs().getClient().handshake;
    }

    return context.switchToHttp().getRequest();
  }
}
