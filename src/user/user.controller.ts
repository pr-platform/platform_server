import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Inject,
  LoggerService,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { Roles } from 'src/role/decorators/role.decorator';
import { RolesNames, PermissionsNames } from '../role/types';
import { RolesGuard } from '../role/guards/role.guard';
import { Permissions } from 'src/role/decorators/permission.decorator';
import { PermissionsGuard } from '../role/guards/permission.guard';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @ApiBody({
    type: CreateUserDto,
  })
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.CREATED)
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

  @Roles(RolesNames.ADMIN)
  @Permissions(PermissionsNames.READ_USERS)
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
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
