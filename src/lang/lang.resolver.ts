import { UseGuards } from "@nestjs/common";
import { Resolver, ResolveField, Args, Int, Parent, Query } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Permissions } from "src/role/decorators/permission.decorator";
import { PermissionsGuard } from "src/role/guards/permission.guard";
import { BlockedGuard } from "src/user/guard/blocked.guard";
import { VerifiedGuard } from "src/user/guard/verified.guard";
import { PermissionsNames } from "./data/permissions";
import { Lang } from "./lang.model";
import { LangService } from "./lang.service";

@Resolver(of => Lang)
export class LangResolver {
  constructor(
    private langService: LangService,
  ) {}

  @Query(returns => Lang)
	@Permissions(PermissionsNames.CREATE_LEXEME)
	@UseGuards(JwtAuthGuard, PermissionsGuard, VerifiedGuard, BlockedGuard)
  async lang(@Args('id', { type: () => Int }) id: number) {
    return this.langService.findById(id);
  }

  @ResolveField()
  async translations(@Parent() lang: Lang) {
    const { id } = lang;
    return this.langService.findAllTranslations(id);
  }
}