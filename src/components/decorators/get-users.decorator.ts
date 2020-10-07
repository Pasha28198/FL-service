import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from "src/user/interfaces/user.interface";

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUser;
  },
);