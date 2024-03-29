import { ModuleInfoService } from '../moduleInfo/moduleInfo.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLangDto } from './dto/create-lang-dto';
import { Lang } from './lang.model';
import { Lexeme } from './lexeme.model';
import { Translation } from './translation.model';
import { CreateLexemeDto } from './dto/create-lexeme-dto';
import { CreateTranslationDto } from './dto/create-translation-dto';
import { Sequelize } from 'sequelize-typescript';
import { roles } from './data/roles';
import { permissions } from './data/permissions';
import langs from './data/langs';
import { RoleService } from '../role/role.service';
import { UpdateTranslationDto } from './dto/update-translation-dto';

@Injectable()
export class LangService {
  constructor(
    @InjectModel(Lang)
    private langModel: typeof Lang,
    @InjectModel(Lexeme)
    private lexemeModel: typeof Lexeme,
    @InjectModel(Translation)
    private translationModel: typeof Translation,
    private sequelize: Sequelize,
    private roleService: RoleService,
    private moduleInfoService: ModuleInfoService,
  ) {}

  async onModuleInit() {
    const isModuleInit = await this.moduleInfoService.findOne({
      where: {
        name: 'lang',
      },
    });

    if (!isModuleInit?.isInit) {
      const t = await this.sequelize.transaction();
      try {
        await this.roleService.createRolesAndPermissionsOnInit(
          roles,
          permissions,
        );
        this.createLangsAndTranslationsOnInit(langs);
        await this.moduleInfoService.create({
          name: 'lang',
          isInit: true,
        });
        await t.commit();
      } catch (error) {
        await t.rollback();
      }
    }
  }

  async createLangsAndTranslationsOnInit(langs) {
    for await (const lang of langs) {
      let existLang = await this.findByAlias(lang.alias);

      if (!existLang) {
        existLang = await this.createLang({
          alias: lang.alias,
          lexeme: lang.lexeme,
        });
      }

      for await (const lexeme of Object.keys(lang.dictionary)) {
        let existLexeme = await this.findLexemeByLexeme(lexeme);

        if (!existLexeme) {
          existLexeme = await this.createLexeme({
            lexeme,
          });
        }

        const translation = lang.dictionary[lexeme];

        let existTranslation = await this.findOneTranslation({
          translation,
          langId: existLang.id,
          lexemeId: existLexeme.id,
        });

        if (!existTranslation) {
          existTranslation = await this.createTranslation({
            translation,
            langId: existLang.id,
            lexemeId: existLexeme.id,
          });
        }
      }
    }
  }

  async createLang(createLangDto: CreateLangDto) {
    try {
      return await this.langModel.create(createLangDto as any);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createLexeme(createLexemeDto: CreateLexemeDto) {
    return await this.lexemeModel.create(createLexemeDto as any);
  }

  async createTranslation(createTranslationDto: CreateTranslationDto) {
    const lang = await this.langModel.findByPk(createTranslationDto.langId);
    const lexeme = await this.lexemeModel.findByPk(
      createTranslationDto.lexemeId,
    );

    if (lang && lexeme) {
      return await this.translationModel.create(createTranslationDto as any);
    }

    throw new BadRequestException();
  }

  async updateTranslation(
    id: number,
    updateTranslationDto: UpdateTranslationDto,
  ) {
    try {
      const translation = await this.translationModel.findByPk(id);

      return await translation.update(updateTranslationDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllLangs(includeDictionary: boolean) {
    return await this.langModel.findAll(
      includeDictionary && {
        include: [
          {
            association: 'translations',
            include: ['lexeme'],
          },
        ],
      },
    );
  }

  async findAllTranslations(langId: number) {
    return await this.translationModel.findAll({
      where: {
        langId,
      },
    });
  }

  async findOneTranslation(where: any) {
    return await this.translationModel.findOne({
      where,
    });
  }

  async findTranslationByTranslation(translation: string) {
    return await this.translationModel.findOne({
      where: {
        translation,
      },
    });
  }

  async findLexemeById(id: number) {
    return await this.lexemeModel.findByPk(id);
  }

  async findLexemeByLexeme(lexeme: string) {
    return await this.lexemeModel.findOne({
      where: { lexeme },
    });
  }

  async findAllLexemes(
    includeTranslations?: boolean,
    translationsLangId?: Pick<Lang, 'id'>,
  ) {
    try {
      if (translationsLangId && !includeTranslations) {
        throw new BadRequestException(
          'Include_translatrion_required_true_if_provide_lang_id',
        );
      }

      const query: any = {};

      if (includeTranslations) {
        query.include = [
          {
            association: 'translations',
            ...(translationsLangId && {
              where: {
                langId: translationsLangId,
              },
            }),
            required: false,
          },
        ];
      }

      return await this.lexemeModel.findAll(query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number, includeDictionary?: boolean) {
    return await this.langModel.findByPk(
      id,
      includeDictionary && {
        include: [
          {
            association: 'translations',
            include: ['lexeme'],
          },
        ],
      },
    );
  }

  async findOne(where, includeDictionary) {
    const args = {
      where,
      ...(includeDictionary && {
        include: [
          {
            association: 'translations',
            include: ['lexeme'],
          },
        ],
      }),
    };

    return await this.langModel.findOne(args);
  }

  async findByAlias(alias: string) {
    return await this.langModel.findOne({
      where: {
        alias,
      },
    });
  }

  async findTranslationById(id: number) {
    return await this.translationModel.findByPk(id);
  }
}
