import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDataDto } from './dto/login-data.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginData: LoginDataDto) {
    const user = await this.userService.findByEmailAndPassword(loginData);

    if (user) {
      return {
        access_token: this.jwtService.sign({ userId: user.id }),
      };
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
