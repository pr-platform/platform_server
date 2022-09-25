import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { mkdirSync, promises } from 'fs';
import { User } from '../user/user.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Filesystem')
@ApiBearerAuth()
@Controller('filesystem')
export class FilesystemController {
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const userId = (req.user as User)?.id || '';

          mkdirSync(`./upload/${userId}`, { recursive: true });

          cb(null, `./upload/${userId}`);
        },
        filename: async (req, file, callback) => {
          const userId = (req.user as User)?.id || '';

          let name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);

          const files = await promises.readdir(`./upload/${userId}`);

          const counts = files
            .filter(
              (existFile) =>
                (existFile.split('(')[0] === name ||
                  existFile.split('.')[0] === name) &&
                fileExtName === extname(existFile),
            )
            .map((existFile) =>
              parseInt(
                existFile.match(/\([0-9]\)/)?.[0]?.match(/\d/g)?.[0] || '0',
              ),
            );

          const maxCount = Math.max(...counts);

          if (maxCount >= 0) {
            name += `(${maxCount + 1})`;
          }

          callback(null, `${name}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map((file) => file.filename);
  }
}
