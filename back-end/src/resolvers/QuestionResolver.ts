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
import { Question } from "../entities/question";

@ArgsType()
export class editOrCreateQuestion {
  @Field()
  title!: string;

  @Field()
  quizId!: string;
}

@Resolver(Question)
export class QuestionResolver {
  @Query(() => [Question])
  getQuestions() {
    return Question.getQuestions();
  }

  @Query(() => Question)
  getQuestion(@Arg("id", () => ID) id: string) {
    return Question.getQuestionById(id);
  }

  @Mutation(() => Question)
  newQuestion(@Args() args: editOrCreateQuestion) {
    return Question.newQuestion(args);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Arg("id", () => ID) id: string,
    @Args() args: editOrCreateQuestion
  ) {
    return Question.updateQuestion(id, args);
  }

  @Mutation(() => Question)
  deleteQuestion(@Arg("id", () => ID) id: string) {
    return Question.deleteQuestion(id);
  }

  @Query(() => [Question])
  getQuestionsByQuiz(@Arg("id") id: string) {
    return Question.getQuestionByQuiz(id);
  }
}
