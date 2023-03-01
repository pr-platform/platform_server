import { ModuleInfoModule } from './../moduleInfo/moduleInfo.module';
import { Module } from '@nestjs/common';
import { FilesystemController } from './filesystem.controller';
import { FilesystemService } from './filesystem.service';
import { MulterModule } from '@nestjs/platform-express';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    RoleModule,
    ModuleInfoModule,
  ],
  controllers: [FilesystemController],
  providers: [FilesystemService],
})
export class FilesystemModule {}
