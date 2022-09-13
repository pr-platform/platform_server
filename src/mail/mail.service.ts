import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  BadRequestException,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async send(mail) {
    mail = {
      to: this.configService.get('TEST_EMAIL_FOR_GET_MAIL'),
      from: this.configService.get('ADMIN_EMAIL'),
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: '<b>welcome</b>',
    };

    try {
      return await this.mailerService.sendMail(mail);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
