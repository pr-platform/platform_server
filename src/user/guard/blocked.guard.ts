import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql'
import { ContextTypes } from 'src/types';

@Injectable()
export class BlockedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    if ((context as any).contextType === ContextTypes.GRAPHQL) {
      return !GqlExecutionContext.create(context).getContext()?.req?.user?.blocked;
    }

    return !context.switchToHttp().getRequest()?.user?.blocked;
  }
}
