import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface JwtPayload {
  sub: string;
  username?: string;
  [key: string]: unknown;
}

interface RequestWithUser extends Request {
  user?: JwtPayload;
}

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): JwtPayload | unknown => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    const user = request.user;

    return data ? user?.[data] : user;
  },
);
