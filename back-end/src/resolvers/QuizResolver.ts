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
import { Quiz } from "../entities/quiz";

@ArgsType()
export class editOrCreateQuiz {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  is_finish!: boolean;

  @Field()
  difficulty!: string;

  @Field()
  image!: string;

  @Field()
  categoryId!: string;
}

@Resolver(Quiz)
export class QuizResolver {
  @Query(() => [Quiz])
  getAllQuiz() {
    return Quiz.getAllQuiz();
  }

  @Query(() => Quiz)
  getQuiz(@Arg("id", () => ID) id: string) {
    return Quiz.getQuizById(id);
  }

  @Mutation(() => Quiz)
  newQuiz(@Args() args: editOrCreateQuiz) {
    return Quiz.newQuiz(args);
  }

  @Mutation(() => Quiz)
  updateQuiz(@Arg("id", () => ID) id: string, @Args() args: editOrCreateQuiz) {
    return Quiz.updateQuiz(id, args);
  }

  @Mutation(() => Quiz)
  deleteQuiz(@Arg("id", () => ID) id: string) {
    return Quiz.deleteQuiz(id);
  }

  @Query(() => [Quiz])
  getQuizByCategory(@Arg("id") id: string) {
    return Quiz.getQuizByCategory(id);
  }
}
