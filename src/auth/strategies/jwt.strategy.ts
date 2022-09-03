import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await User.findOne({
      where: {
        id: payload.userId,
      },
      include: [
        {
          association: 'role',
          include: ['permissions'],
        },
      ],
    });

    const role = (user as any).dataValues.role.dataValues;

    const currentUser = {
      ...(user as any).dataValues,
      role: {
        id: role.id,
        alias: role.alias,
        title: role.title,
        permissions: role.permissions.map((permission) => ({
          id: permission.dataValues.id,
          alias: permission.dataValues.alias,
          title: permission.dataValues.title,
        })),
      },
    };

    return currentUser;
  }
}
