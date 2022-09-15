import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDataDto } from './dto/login-data.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { RolesNames } from '../role/types';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordBodyDto } from './dto/reset-password-body.dto';
import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
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
      this.logger.error(error.message);
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

  async requestOnResetPassword(email: string) {
    try {
      const user = await this.userService.findOne({
        where: {
          email,
        },
      });

      await user.update({
        verified: false,
      });

      const resetToken = this.jwtService.sign(
        { userId: user.id, type: 'reset' },
        {
          expiresIn: 60 * 60 * 1000,
        },
      );

      await this.mailService.send({
        from: this.configService.get('ADMIN_EMAIL'),
        to: user.email,
        subject: 'Reset password',
        text: `Check this link ${this.configService.get(
          'DOMAIN',
        )}/?reset_token=${resetToken}`,
        html: `Check this link <a href="${this.configService.get(
          'DOMAIN',
        )}/?reset_token=${resetToken}'">Reset password</a>`,
      });

      return {
        requestReset: 'ok',
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async resetPassword(resetDto: ResetPasswordBodyDto) {
    const decoded = this.jwtService.decode(resetDto.reset_token) as any;

    if (decoded.type !== 'reset') {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(decoded.userId);

    try {
      const password = await this.userService.hashPassword(resetDto.password);

      await user.update({
        password,
        verified: true,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }

    await this.mailService.send({
      from: this.configService.get('ADMIN_EMAIL'),
      to: user.email,
      subject: 'Your password is changed',
      text: 'Your password is changed',
      html: 'Your password is changed',
    });

    return {
      reset: 'ok',
    };
  }
}
