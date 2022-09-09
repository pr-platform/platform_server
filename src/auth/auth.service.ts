import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDataDto } from './dto/login-data.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { RolesNames } from '../role/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
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

  async registration(user: CreateUserDto) {
    const defaultRole = await this.roleService.findByAlias(RolesNames.DEFAULT);

    try {
      return await this.userService.create({
        ...user,
        roleId: defaultRole.id,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
