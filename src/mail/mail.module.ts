import { ModuleInfoModule } from '../moduleInfo/moduleInfo.module';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule, ModuleInfoModule],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
