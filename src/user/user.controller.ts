import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Inject,
  LoggerService,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { BadRequestException } from '@nestjs/common';
import { Roles } from 'src/role/decorators/role.decorator';
import { RolesGuard } from '../role/guards/role.gaurd';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userService.create(createUserDto);

      if (createdUser) {
        this.logger.log('User is create');
      }
      return createdUser;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/')
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async findByAccessToken(@Headers('Authorization') bearerAccessToken: string) {
    const accessToken = bearerAccessToken.split(' ')[1];
    return await this.userService.findByAccessToken(accessToken);
  }
}
