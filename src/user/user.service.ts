import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDataDto } from '../auth/dto/login-data.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { roles } from './data/roles';
import { permissions } from './data/permissions';
import { Sequelize } from 'sequelize-typescript';
import { ModuleInfoService } from '../moduleInfo/moduleInfo.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
    private jwtService: JwtService,
    private roleService: RoleService,
    private sequelize: Sequelize,
    private moduleInfoService: ModuleInfoService,
  ) {}
  async hashPassword(password) {
    return await bcrypt.hash(
      password,
      parseInt(this.configService.get<string>('PASSWORD_SALT'), 10),
    );
  }

  async onModuleInit() {
    const isModuleInit = await this.moduleInfoService.findOne({
      where: {
        name: 'user',
      },
    });

    if (!isModuleInit?.isInit) {
      const t = await this.sequelize.transaction();
      try {
        await this.roleService.createRolesAndPermissionsOnInit(
          roles,
          permissions,
        );

        const admin = await this.findOrCreateAdmin();

        if (!admin.roleId) {
          const adminRole = await this.roleService.findByAlias('admin');
          await adminRole.$add('users', admin);
        }

        await this.moduleInfoService.create({
          name: 'user',
          isInit: true,
        });
        await t.commit();
      } catch (error) {
        await t.rollback();
      }
    }
  }

  async findOrCreateAdmin() {
    const admin = await this.findOrCreate(
      {
        email: this.configService.get('ADMIN_EMAIL'),
      },
      {
        email: this.configService.get('ADMIN_EMAIL'),
        password: await this.hashPassword(
          this.configService.get('ADMIN_PASSWORD'),
        ),
        verified: true,
      },
    );

    return admin[0];
  }

  async findOrCreate(user: Partial<CreateUserDto>, defaults?: CreateUserDto) {
    return this.userModel.findOrCreate({
      where: {
        ...user,
      },
      defaults: defaults as any,
    });
  }

  async create(createUserData: CreateUserDto) {
    const password = await this.hashPassword(createUserData.password);

    return await this.userModel.create<User>({
      ...createUserData,
      password,
    });
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findById(id: string) {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOne(query) {
    return this.userModel.findOne(query);
  }

  async findByEmailAndPassword(loginData: LoginDataDto) {
    const user = await this.userModel.findOne({
      where: {
        email: loginData.email,
      },
    });

    if (!user) return;

    const isMatch = await bcrypt.compare(loginData.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password is not correct');
    }

    return user;
  }

  async findByAccessToken(accessToken: string) {
    const decoded = this.jwtService.decode(accessToken) as any;

    if (decoded.type !== 'login') {
      throw new UnauthorizedException();
    }

    return this.findById(decoded.userId);
  }

  async remove(id: string) {
    const user = await this.findById(id);
    await user.destroy();
  }
}
