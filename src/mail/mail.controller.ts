import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send')
  async send(@Body() mail: any) {
    return await this.mailService.send(mail);
  }
}
