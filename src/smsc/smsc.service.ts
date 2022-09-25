import { Injectable, BadRequestException } from '@nestjs/common';
import { permissions } from './data/permissions';
import { roles } from './data/roles';
import SmscApi from './library/smsc_api';
import { Sequelize } from 'sequelize-typescript';
import { RoleService } from '../role/role.service';
import { ConfigService } from '@nestjs/config';
import SendSmsBodyDto from './dto/send-sms-body.dto';
import { Response } from 'express';

const smsc = new SmscApi();

@Injectable()
export class SmscService {
  constructor(
    private sequelize: Sequelize,
    private roleService: RoleService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const t = await this.sequelize.transaction();

    try {
      await this.roleService.createRolesAndPermissionsOnInit(
        roles,
        permissions,
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
    }

    this.configure({
      login: this.configService.get('SMSC_LOGIN'),
      password: this.configService.get('SMSC_PASSWORD'),
      ssl: this.configService.get('SMSC_SSL'),
      charset: 'utf-8',
    });
  }

  configure(config) {
    smsc.configure(config);
  }

  sendSms(data: SendSmsBodyDto, res: Response) {
    smsc.send_sms(data, (data, raw, err, code) => {
      if (err) throw new BadRequestException(`Error: ${err}, Code: ${code}`);

      res.send({ ...data });
    });
  }

  getBalance(res: Response) {
    smsc.get_balance((balance, raw, err, code) => {
      if (err) throw new BadRequestException(`Error: ${err}, Code: ${code}`);

      res.send({ balance });
    });
  }
}
