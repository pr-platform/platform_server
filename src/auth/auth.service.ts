import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDataDto } from './dto/login-data.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { RolesNames } from '../role/types';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginData: LoginDataDto) {
    const user = await this.userService.findByEmailAndPassword(loginData);

    if (user) {
      return {
        access_token: this.jwtService.sign({ userId: user.id, type: 'login' }),
      };
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async registration(user: CreateUserDto) {
    const defaultRole = await this.roleService.findByAlias(RolesNames.DEFAULT);

    try {
      const createdUser = await this.userService.create({
        ...user,
        verified: false,
        roleId: defaultRole.id,
      });

      const verifiedToken = this.jwtService.sign(
        { userId: createdUser.id, type: 'verified' },
        {
          expiresIn: 24 * 60 * 60 * 1000,
          secret: this.configService.get('JWT_VERIFIED_SECRETE_KEY'),
        },
      );

      await this.mailService.send({
        from: this.configService.get('ADMIN_EMAIL'),
        to: createdUser.email,
        subject: 'Verified your account',
        text: `Check this link ${this.configService.get(
          'DOMAIN',
        )}/?verified_token=${verifiedToken}`,
        html: `Check this link <a href="${this.configService.get(
          'DOMAIN',
        )}/?verified_token=${verifiedToken}'">Verified</a>`,
      });

      return {
        registration: 'ok',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async verified(verifiedToken: string) {
    const decoded = this.jwtService.decode(verifiedToken) as any;

    if (decoded.type !== 'verified') {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(decoded.userId);

    if (!user.verified) {
      const updatedUser = await user.update({
        verified: true,
      });

      await this.mailService.send({
        from: this.configService.get('ADMIN_EMAIL'),
        to: updatedUser.email,
        subject: 'Your account is verified',
        text: 'Your account is verified',
        html: 'Your account is verified',
      });
    }

    return {
      verified: 'ok',
    };
  }
}
