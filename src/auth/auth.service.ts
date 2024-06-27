import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    userId: number,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(userId);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, password: pass };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}