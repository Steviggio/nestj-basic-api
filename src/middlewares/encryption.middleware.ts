// encryption.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/Users/users.service';

@Injectable()
export class EncryptionMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    if (password) {
      // Hash the incoming password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Replace the incoming plain text password with the hashed one
      req.body.password = hashedPassword;
    }

    next();
  }
}
