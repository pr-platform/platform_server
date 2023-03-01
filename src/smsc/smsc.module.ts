import { ModuleInfoModule } from '../moduleInfo/moduleInfo.module';
import { Module } from '@nestjs/common';
import { SmscController } from './smsc.controller';
import { SmscService } from './smsc.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule, ModuleInfoModule],
  controllers: [SmscController],
  providers: [SmscService],
  exports: [SmscService],
})
export class SmscModule {}
