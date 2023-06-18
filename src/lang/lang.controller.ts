import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LangService } from './lang.service';
import { Lang } from './lang.model';
import { CreateLangDto } from './dto/create-lang-dto';
import { Lexeme } from './lexeme.model';
import { CreateLexemeDto } from './dto/create-lexeme-dto';
import { CreateTranslationDto } from './dto/create-translation-dto';
import { Translation } from './translation.model';
import { Permissions } from 'src/role/decorators/permission.decorator';
import { PermissionsNames } from './data/permissions';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../role/guards/permission.guard';
import { VerifiedGuard } from '../user/guard/verified.guard';
import { BlockedGuard } from '../user/guard/blocked.guard';
import { UpdateTranslationDto } from './dto/update-translation-dto';

@ApiTags('Lang')
@ApiBearerAuth()
@Controller('langs')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @ApiBody({
    type: CreateLangDto,
    examples: {
      CREATE_TEST_LANG: {
        value: {
          alias: 'te',
          lexeme: 'Test',
        },
      },
    },
    description: 'Set alias for create lang',
  })
  @ApiCreatedResponse({
    type: Lang,
    description: 'Return created lang',
  })
  @Permissions(PermissionsNames.CREATE_LANG)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createLang(@Body() createLangDto: CreateLangDto) {
    return this.langService.createLang(createLangDto);
  }

  @ApiBody({
    type: CreateLexemeDto,
    examples: {
      CREATE_TEST_LEXEME: {
        value: {
          lexeme: 'test',
        },
      },
    },
    description: 'Set required field for create lexeme',
  })
  @ApiCreatedResponse({
    type: Lexeme,
    description: 'Return created lexeme',
  })
  @Permissions(PermissionsNames.CREATE_LEXEME)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/lexeme')
  async createLexeme(@Body() createLexemeDto: CreateLexemeDto) {
    return this.langService.createLexeme(createLexemeDto);
  }

  @ApiBody({
    type: CreateTranslationDto,
    examples: {
      CREATE_TEST_TRANSLATION: {
        value: {
          translation: 'Test',
          langId: 1,
          lexemeId: 1,
        },
      },
    },
    description: 'Set required field for create translation',
  })
  @ApiCreatedResponse({
    type: Translation,
    description: 'Return created translation',
  })
  @Permissions(PermissionsNames.CREATE_TRANSLATION)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/translation')
  async createTransalation(@Body() createTranslationDto: CreateTranslationDto) {
    return this.langService.createTranslation(createTranslationDto);
  }

  @ApiBody({
    type: UpdateTranslationDto,
    examples: {
      UPDATE_TEST_TRANSLATION: {
        value: {
          translation: 'Test 1',
        },
      },
    },
    description: 'Set required field for update translation',
  })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @ApiOkResponse({
    type: Translation,
    description: 'Return updated translation',
  })
  @Permissions(PermissionsNames.UPDATE_TRANSLATION)
  @UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  @HttpCode(HttpStatus.OK)
  @Put('/translation/:id')
  async updateTransalation(
    @Param('id') id: number,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ) {
    return this.langService.updateTranslation(id, updateTranslationDto);
  }

  @ApiQuery({
    type: Boolean,
    name: 'include_dictionary',
    required: false,
  })
  @ApiResponse({
    type: [Lang],
    description: 'Return all langs',
  })
  @Get('/')
  async findAllLangs(@Query('include_dictionary') includeDictionary: string) {
    return await this.langService.findAllLangs(includeDictionary === 'true');
  }

  @ApiQuery({
    type: Boolean,
    name: 'include_dictionary',
    required: false,
  })
  @ApiQuery({
    name: 'where',
    schema: {
      example: {
        alias: 'ru',
      },
    },
    required: false,
  })
  @ApiResponse({
    type: [Lang],
    description: 'Return all langs',
  })
  @Get('/find-one')
  async findOne(
    @Query('where') where: string,
    @Query('include_dictionary') includeDictionary: string,
  ) {
    return await this.langService.findOne(where, includeDictionary === 'true');
  }

  @ApiQuery({
    type: Boolean,
    name: 'include_dictionary',
    required: false,
  })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @ApiResponse({
    type: [Lang],
    description: 'Return lang',
  })
  @Get('/lang/:id')
  async findById(
    @Param('id') id: number,
    @Query('include_dictionary') includeDictionary: string,
  ) {
    return await this.langService.findById(id, includeDictionary === 'true');
  }

  @ApiQuery({
    type: Boolean,
    name: 'include_translations',
    required: false,
  })
  @ApiQuery({
    type: Number,
    name: 'translations_lang_id',
    required: false,
  })
  @ApiResponse({
    type: [Lexeme],
    description: 'Return all lexemes',
  })
  @Get('/lexemes')
  async findAllLexemes(
    @Query('include_translations') includeTranslations: string,
    @Query('translations_lang_id') translationsLangId: Pick<Lang, 'id'>,
  ) {
    return await this.langService.findAllLexemes(
      includeTranslations === 'true',
      translationsLangId,
    );
  }
}
