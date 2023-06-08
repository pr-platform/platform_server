import { Module } from '@nestjs/common';
import { VideoChatGateway } from './videoChat.gateway';

@Module({
  providers: [VideoChatGateway],
})
export class VideoChatModule {}
