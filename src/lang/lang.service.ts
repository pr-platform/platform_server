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
import { RoleService } from '../role/role.service';

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
  ) {}

  async onModuleInit() {
    const t = await this.sequelize.transaction();
    try {
      await this.roleService.createRolesAndPermissionsOnInit(
        roles,
        permissions,
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  }

  async createLang(createLangDto: CreateLangDto) {
    return await this.langModel.create(createLangDto as any);
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
      }
    });
  }

  async findLexemeById(id: number) {
    return await this.lexemeModel.findByPk(id);
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

  async findTranslationById(id: number) {
    return await this.translationModel.findByPk(id);
  }
}
