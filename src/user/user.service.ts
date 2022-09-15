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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async hashPassword(password) {
    return await bcrypt.hash(
      password,
      parseInt(this.configService.get<string>('PASSWORD_SALT'), 10),
    );
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
