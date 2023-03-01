import { Controller } from '@nestjs/common';

import { ModuleInfoService } from './moduleInfo.service';

@Controller('module-info')
export class ModuleInfoController {
  constructor(private readonly moduleInfoService: ModuleInfoService) {}
}
