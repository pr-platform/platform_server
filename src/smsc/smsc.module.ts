import { Module } from '@nestjs/common';
import { SmscController } from './smsc.controller';
import { SmscService } from './smsc.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule],
  controllers: [SmscController],
  providers: [SmscService],
  exports: [SmscService],
})
export class SmscModule {}
