
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    try {
      console.log(token)
      jwt.verify(token, process.env.TOKEN_SECRET);
      console.log(token, process.env.TOKEN_SECRET);
      return true; // Authentication successful
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
