import { Module } from '@nestjs/common';
import { LangService } from './lang.service';
import { LangController } from './lang.controller';
import { Lang } from './lang.model';
import { Lexeme } from './lexeme.model';
import { Translation } from './translation.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Lang, Lexeme, Translation]),
    RoleModule,
  ],
  providers: [LangService],
  controllers: [LangController],
})
export class LangModule {}
