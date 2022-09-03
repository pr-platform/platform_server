import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async onModuleInit() {
    console.log('app module');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
