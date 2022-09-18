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
  Put,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionsNames } from './data/permissions';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permission.guard';
import { Permissions } from './decorators/permission.decorator';
import { Role } from './role.model';
import { VerifiedGuard } from '../user/guard/verified.guard';
import { BlockedGuard } from './../user/guard/blocked.guard';
import { Permission } from './permission.model';

class BodyFindByAlias {
  @ApiProperty()
  alias: string;
}

@ApiTags('Role')
@ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @Post('/')
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
  @UseGuards(JwtAuthGuard, PermissionsGuard, BlockedGuard)
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
  @UseGuards(JwtAuthGuard, PermissionsGuard, BlockedGuard)
  @Get('/:id')
  private async findById(@Param('id') id: number) {
    return await this.roleService.findById(id);
  }

  @ApiOkResponse({
    type: [Role],
    description: 'Return roles array',
  })
  @Permissions(PermissionsNames.READ_ROLES)
  @UseGuards(JwtAuthGuard, PermissionsGuard, BlockedGuard)
  @Get('/')
  private async findAll() {
    return await this.roleService.findAll();
  }

  @ApiBody({
    examples: {
      SET_PERMISSIONS: {
        value: {
          roleId: 2,
          permissionIds: [1, 2, 3, 4],
        },
      },
    },
    description: 'Set required field for set permissions',
  })
  @ApiCreatedResponse({
    type: [Permission],
    description: 'Return permission array',
  })
  @Permissions(PermissionsNames.CHANGE_PERMISSIONS)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @Put('/set-permissions')
  private async addPermission(
    @Body('roleId') roleId: number,
    @Body('permissionIds') permissionIds: number[],
  ) {
    try {
      return await this.roleService.setPermissions(roleId, permissionIds);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  @ApiBody({
    examples: {
      SET_PERMISSIONS: {
        value: {
          roleId: 2,
          permissionIds: [1, 2, 3, 4],
        },
      },
    },
    description: 'Set required field for unset permissions',
  })
  @ApiCreatedResponse({
    type: Number,
    description: 'Return count',
  })
  @Permissions(PermissionsNames.CHANGE_PERMISSIONS)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @Put('/unset-permissions')
  private async unsetPermission(
    @Body('roleId') roleId: number,
    @Body('permissionIds') permissionIds: number[],
  ) {
    try {
      return await this.roleService.unsetPermissions(roleId, permissionIds);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
