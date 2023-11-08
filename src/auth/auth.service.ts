import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/Users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateUser(email: string, pwd: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pwd) {
      const { password, ...result } = user;
      return result;
    }
    return null
  }

}
