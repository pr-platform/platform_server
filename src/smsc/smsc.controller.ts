import {
  Controller,
  Inject,
  LoggerService,
  Post,
  Get,
  Body,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SmscService } from './smsc.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import SendSmsBodyDto from './dto/send-sms-body.dto';
import { ResponseOnSendSms } from './dto/response-on-send-sms.dto';
import BalanceDto from './dto/balance.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/role/decorators/permission.decorator';
import { PermissionsNames } from './data/permissions';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../role/guards/permission.guard';
import { VerifiedGuard } from '../user/guard/verified.guard';
import { BlockedGuard } from '../user/guard/blocked.guard';

@ApiTags('Smsc')
@ApiBearerAuth()
@Controller('smsc')
export class SmscController {
  constructor(
    private smscService: SmscService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  addAccount() {
    // TODO: Add endpoint
  }

  getAccount() {
    // TODO: Add endpoint
  }

  @ApiBody({
    type: SendSmsBodyDto,
    examples: {
      SEND_SMS_DATA: {
        value: {
          phones: ['79999999999'],
          message: 'Hello!',
        },
      },
    },
    description: 'Set phones and message',
  })
  @ApiResponse({
    type: ResponseOnSendSms,
    description: 'Return sms data id',
  })
  @Permissions(PermissionsNames.SEND_SMS)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @Post('/send-sms')
  sendSms(@Body() data: SendSmsBodyDto, @Res() res) {
    try {
      return this.smscService.sendSms(data, res);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async sendEmail() {
    // TODO: Add endpoint
  }

  async sendMms() {
    // TODO: Add endpoint
  }

  @ApiResponse({
    type: BalanceDto,
    description: 'Return balance',
  })
  @Permissions(PermissionsNames.GET_BALANCE)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @Get('/balance')
  getBalance(@Res() res) {
    try {
      return this.smscService.getBalance(res);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  getSmsStatus() {
    // TODO: Add endpoint
  }

  getSmsCost() {
    // TODO: Add endpoint
  }
}
