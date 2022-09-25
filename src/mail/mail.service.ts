import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  BadRequestException,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { User } from '../user/user.model';
import { RoleService } from '../role/role.service';
import { roles } from './data/roles';
import { permissions } from './data/permissions';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private roleService: RoleService,
    private sequelize: Sequelize,
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
  }

  async send(mail: ISendMailOptions) {
    // mail = {
    //   to: this.configService.get('TEST_EMAIL_FOR_GET_MAIL'),
    //   from: this.configService.get('ADMIN_EMAIL'),
    //   subject: 'Testing Nest MailerModule ✔',
    //   text: 'welcome',
    //   html: '<b>welcome</b>',
    // };

    try {
      await this.mailerService.sendMail(mail);

      return {
        message_send: 'ok',
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async sendByUser(mail: ISendMailOptions, user: User) {
    try {
      return await this.send({
        ...mail,
        from: user.email,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
