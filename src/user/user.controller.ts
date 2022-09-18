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
import { PermissionsNames } from './data/permissions';
import { Permissions } from 'src/role/decorators/permission.decorator';
import { PermissionsGuard } from '../role/guards/permission.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.model';
import { VerifiedGuard } from './guard/verified.guard';
import { BlockedGuard } from './guard/blocked.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @ApiBody({
    type: CreateUserDto,
    examples: {
      CREATE_TEST_USER: {
        value: {
          email: 'test@gmail.com',
          password: 'password',
        },
      },
    },
    description: 'Set required field for create user',
  })
  @ApiCreatedResponse({
    type: User,
    description: 'Return created user',
  })
  @Permissions(PermissionsNames.CREATE_USERS)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
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

  @ApiOkResponse({
    type: [User],
    description: 'Return users array',
  })
  @Permissions(PermissionsNames.READ_USERS)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @Get('/')
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOkResponse({
    type: User,
    description: 'Return profile',
  })
  @UseGuards(JwtAuthGuard, BlockedGuard)
  @Get('/profile')
  async findByAccessToken(@Headers('Authorization') bearerAccessToken: string) {
    const accessToken = bearerAccessToken.split(' ')[1];
    return await this.userService.findByAccessToken(accessToken);
  }
}
