import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../user/user.model';
import { LoginDataDto } from './dto/login-data.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { ResetPasswordBodyDto } from './dto/reset-password-body.dto';
import { RequestOnResetPasswordBodyDto } from './dto/request-on-reset-password-body.dto';
import { VerifiedBodyDto } from './dto/verified-body.dto';

class ReturnedLoginData {
  @ApiProperty()
  access_token: string;
}

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: LoginDataDto,
    examples: {
      LOGIN_TEST_USER: {
        value: {
          email: 'test@gmail.com',
          password: 'password',
        },
      },
    },
    description: 'Set required field for login',
  })
  @ApiCreatedResponse({
    type: ReturnedLoginData,
    description: 'Return access token',
  })
  @Post('login')
  async login(@Body() user: LoginDataDto) {
    return this.authService.login(user);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with access token',
  })
  @ApiOkResponse({
    type: User,
    description: 'Return profile',
  })
  @ApiForbiddenResponse()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiBody({
    type: CreateUserDto,
    examples: {
      REGISTRATION_TEST_USER: {
        value: {
          email: 'test@gmail.com',
          password: 'password',
        },
      },
    },
    description: 'Set required field for registration',
  })
  @ApiCreatedResponse({
    description: 'Return ok if registration user',
  })
  @Post('/registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registration(createUserDto);
  }

  @ApiOkResponse({
    description: 'Return ok if verified',
  })
  @ApiBody({
    type: VerifiedBodyDto,
    description: 'Set verified token',
  })
  @Post('/verified')
  async verified(@Body('verified_token') verifiedToken: string) {
    return await this.authService.verified(verifiedToken);
  }

  @ApiOkResponse({
    description: 'Return ok if request reset',
  })
  @ApiBody({
    type: RequestOnResetPasswordBodyDto,
    examples: {
      REQUEST_FOR_RESET_PASSWORD: {
        value: {
          email: 'test@gmail.com',
        },
      },
    },
    description: 'Send email for reset password',
  })
  @Post('/request-on-reset-password')
  async requestOnResetPassword(@Body('email') email: string) {
    return await this.authService.requestOnResetPassword(email);
  }

  @ApiOkResponse({
    description: 'Return ok if reset',
  })
  @ApiBody({
    type: ResetPasswordBodyDto,
    examples: {
      REQUEST_PASSWORD: {
        value: {
          reset_token: '',
          password: 'password',
        },
      },
    },
    description: 'Send new password and reset token token',
  })
  @Post('/reset-password')
  async resetPassword(@Body() resetDto: ResetPasswordBodyDto) {
    return await this.authService.resetPassword(resetDto);
  }
}
