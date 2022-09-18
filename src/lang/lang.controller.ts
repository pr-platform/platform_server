import { Controller, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LangService } from './lang.service';
import { Lang } from './lang.model';
import { CreateLangDto } from './dto/create-lang-dto';
import { Lexeme } from './lexeme.model';
import { CreateLexemeDto } from './dto/create-lexeme-dto';
import { CreateTranslationDto } from './dto/create-translation-dto';
import { Translation } from './translation.model';

@ApiTags('Lang')
@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @ApiBody({
    type: CreateLangDto,
    examples: {
      CREATE_TEST_ROLE: {
        value: {
          alias: 'en',
        },
      },
    },
    description: 'Set alias for create lang',
  })
  @ApiCreatedResponse({
    type: Lang,
    description: 'Return created lang',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createLang(@Body() createLangDto: CreateLangDto) {
    return this.langService.createLang(createLangDto);
  }

  @ApiBody({
    type: CreateLexemeDto,
    examples: {
      CREATE_TEST_ROLE: {
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
  @HttpCode(HttpStatus.CREATED)
  @Post('/lexeme')
  async createLexeme(@Body() createLexemeDto: CreateLexemeDto) {
    return this.langService.createLexeme(createLexemeDto);
  }

  @ApiBody({
    type: CreateTranslationDto,
    examples: {
      CREATE_TEST_ROLE: {
        value: {
          translation: 'Test',
        },
      },
    },
    description: 'Set required field for create translation',
  })
  @ApiCreatedResponse({
    type: Translation,
    description: 'Return created translation',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/translation')
  async createTransalation(@Body() createTranslationDto: CreateTranslationDto) {
    return this.langService.createTranslation(createTranslationDto);
  }
}
