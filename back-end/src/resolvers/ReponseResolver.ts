import {
  ArgsType,
  Query,
  Resolver,
  Field,
  Mutation,
  Args,
  Arg,
  ID,
} from "type-graphql";
import { Reponse } from "../entities/reponse";

@ArgsType()
export class editOrCreateReponse {
  @Field()
  title!: string;

  @Field({ defaultValue: false, nullable: true })
  isValid!: boolean;

  @Field()
  questionId!: string;
}

@Resolver(Reponse)
export class ReponseResolver {
  @Query(() => [Reponse])
  getReponses() {
    return Reponse.getReponses();
  }

  @Query(() => Reponse)
  getReponse(@Arg("id", () => ID) id: string) {
    return Reponse.getReponseById(id);
  }

  @Mutation(() => Reponse)
  newReponse(@Args() args: editOrCreateReponse) {
    return Reponse.newReponse(args);
  }

  @Mutation(() => Reponse)
  updateReponse(
    @Arg("id", () => ID) id: string,
    @Args() args: editOrCreateReponse
  ) {
    return Reponse.updateReponse(id, args);
  }

  @Mutation(() => Reponse)
  deleteReponse(@Arg("id", () => ID) id: string) {
    return Reponse.deleteReponse(id);
  }
}
