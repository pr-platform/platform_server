import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDataDto } from '../auth/dto/login-data.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const createAdminData: CreateUserDto = {
      email: this.configService.get('ADMIN_EMAIL'),
      password: this.configService.get('ADMIN_PASSWORD'),
    };

    const existAdmin = this.findByEmailAndPassword(createAdminData);

    if (!existAdmin) {
      await this.create(createAdminData);
    }
  }

  async create(createUserData: CreateUserDto) {
    const password = await bcrypt.hash(
      createUserData.password,
      parseInt(this.configService.get<string>('PASSWORD_SALT'), 10),
    );

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

  async findByEmailAndPassword(loginData: LoginDataDto) {
    const user = await this.userModel.findOne({
      where: {
        email: loginData.email,
      },
    });

    const isMatch = await bcrypt.compare(loginData.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password is not correct');
    }

    return user;
  }

  async findByAccessToken(accessToken: string) {
    const id = (this.jwtService.decode(accessToken) as any).userId;

    return this.findById(id);
  }

  async remove(id: string) {
    const user = await this.findById(id);
    await user.destroy();
  }
}
