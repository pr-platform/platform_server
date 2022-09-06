import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('/create')
  private async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return await this.roleService.createRole(createRoleDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  @Get('/find-by-alias')
  private async findByAlias(@Body('alias') alias: string) {
    return await this.roleService.findByAlias(alias);
  }

  @Get('/find-by-id')
  private async findById(@Body('id') id: string) {
    return await this.roleService.findById(id);
  }

  @Get('/')
  private async findAll() {
    return await this.roleService.findAll();
  }
}
