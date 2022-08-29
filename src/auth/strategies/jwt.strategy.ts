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
      include: ['role'],
    });

    const currentUser = {
      ...(user as any).dataValues,
      role: {
        ...(user as any).dataValues.role.dataValues,
      },
    };

    return currentUser;
  }
}
