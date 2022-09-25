import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../role/guards/permission.guard';
import { PermissionsNames } from './data/permissions';
import { Permissions } from '../role/decorators/permission.decorator';
import { BlockedGuard } from '../user/guard/blocked.guard';
import { VerifiedGuard } from '../user/guard/verified.guard';
import { Address } from 'nodemailer/lib/mailer';
import { AttachmentLikeObject } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

class MailBodyExample implements ISendMailOptions {
  @ApiProperty()
  to: string | string[] | Address;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  text: string | Buffer | AttachmentLikeObject;
  @ApiProperty()
  html: string | Buffer;
}

@ApiTags('Mail')
@ApiBearerAuth()
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiBody({
    type: MailBodyExample,
    examples: {
      MAIL: {
        value: {
          to: 'test@gmail.com',
          subject: 'Testing Nest MailerModule ✔',
          text: 'welcome',
          html: '<b>welcome</b>',
        },
      },
    },
  })
  @Permissions(PermissionsNames.SEND_EMAIL)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @Post('/send-by-user')
  async sendByUser(@Body() mail: ISendMailOptions, @Request() req) {
    return await this.mailService.sendByUser(mail, req.user);
  }
}
