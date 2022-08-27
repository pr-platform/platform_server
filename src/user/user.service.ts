import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserData: CreateUserDto) {
    return this.userModel.create<User>(createUserData as any);
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: string) {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
