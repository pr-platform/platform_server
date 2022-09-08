import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
  Inject,
  HttpCode,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionsNames } from './types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permission.guard';
import { Permissions } from './decorators/permission.decorator';
import { Role } from './role.model';

class BodyFindByAlias {
  @ApiProperty()
  alias: string;
}

@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @ApiBody({
    type: CreateRoleDto,
    examples: {
      CREATE_TEST_ROLE: {
        value: {
          alias: 'test',
          title: 'Test role',
        },
      },
    },
    description: 'Set required field for create role',
  })
  @ApiCreatedResponse({
    type: Role,
    description: 'Return created role',
  })
  @HttpCode(HttpStatus.CREATED)
  @Permissions(PermissionsNames.CREATE_ROLES)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post('/create')
  private async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return await this.roleService.createRole(createRoleDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  @ApiBody({
    type: BodyFindByAlias,
    examples: {
      ADMIN_ROLE: {
        value: {
          alias: 'admin',
        },
      },
      DEFAULT_ROLE: {
        value: {
          alias: 'default',
        },
      },
    },
    description: 'Set role alias',
  })
  @ApiOkResponse({
    type: Role,
    description: 'Return role',
  })
  @Permissions(PermissionsNames.READ_ROLES)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/find-by-alias')
  private async findByAlias(@Body('alias') alias: string) {
    return await this.roleService.findByAlias(alias);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    examples: {
      ROLE: {
        value: 1,
      },
    },
    description: 'Set required id role param',
  })
  @ApiOkResponse({
    type: Role,
    description: 'Return role',
  })
  @Permissions(PermissionsNames.READ_ROLES)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/:id')
  private async findById(@Param('id') id: number) {
    return await this.roleService.findById(id);
  }

  @ApiOkResponse({
    type: [Role],
    description: 'Return roles array',
  })
  @Permissions(PermissionsNames.READ_ROLES)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/')
  private async findAll() {
    return await this.roleService.findAll();
  }
}
