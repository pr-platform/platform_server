import { ModuleInfoModule } from './../moduleInfo/moduleInfo.module';
import { Module } from '@nestjs/common';
import { VideoChatGateway } from './videoChat.gateway';
import { VideoChatService } from './videoChat.service';
import { RoleModule } from 'src/role/role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lang } from 'src/lang/lang.model';
import { Lexeme } from 'src/lang/lexeme.model';
import { Translation } from 'src/lang/translation.model';

@Module({
  imports: [
    RoleModule,
    ModuleInfoModule,
    SequelizeModule.forFeature([Lang, Lexeme, Translation]),
  ],
  providers: [VideoChatGateway, VideoChatService],
  // exports: [VideoChatService],
})
export class VideoChatModule {}
