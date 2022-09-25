import { Module } from '@nestjs/common';
import { FilesystemController } from './filesystem.controller';
import { FilesystemService } from './filesystem.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [FilesystemController],
  providers: [FilesystemService],
})
export class FilesystemModule {}
