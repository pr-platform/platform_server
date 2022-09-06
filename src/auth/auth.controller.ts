import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../user/user.model';
import { LoginDataDto } from './dto/login-data.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: LoginDataDto,
  })
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with access token',
  })
  @ApiOkResponse({
    type: User,
  })
  @ApiForbiddenResponse()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
