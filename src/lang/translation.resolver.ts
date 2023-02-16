import { Resolver, ResolveField, Args, Int, Parent, Query } from "@nestjs/graphql";
import { LangService } from "./lang.service";
import { Translation } from "./translation.model";

@Resolver(of => Translation)
export class TranslationResolver {
  constructor(
    private langService: LangService,
  ) {}

  @Query(returns => Translation)
  async translation(@Args('id', { type: () => Int }) id: number) {
    return this.langService.findTranslationById(id);
  }

  @ResolveField()
  async lexeme(@Parent() translation: Translation) {
    const { lexemeId } = translation;
    return this.langService.findLexemeById(lexemeId);
  }
}