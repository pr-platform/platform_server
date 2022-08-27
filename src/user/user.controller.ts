import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

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
      const createdUser = this.userService.create(createUserDto);

      if (createdUser) {
        this.logger.log('User is create');
      }
      return this.userService.create(createUserDto);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll() {
    return this.userService.findAll();
  }
}
