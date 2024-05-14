import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Quiz } from "./quiz";
import { editOrCreateQuestion } from "../resolvers/QuestionResolver";
import { Reponse } from "./reponse";

@Entity()
@ObjectType()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  title!: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    eager: true,
  })
  @Field(() => Quiz)
  quiz!: Quiz;

  @OneToMany(() => Reponse, (reponse) => reponse.question)
  @Field(() => [Reponse])
  reponses!: Reponse[];

  constructor(question?: Partial<Question>) {
    super();
    if (question) {
      if (!question.title) {
        throw new Error("Le titre de la question est obligatoire");
      }
      this.title = question.title;
    }
  }

  static async newQuestion(
    questionData: editOrCreateQuestion
  ): Promise<Question> {
    const question = new Question(questionData);
    const saveQuestion = await question.save();
    return saveQuestion;
  }

  static async getQuestions(): Promise<Question[]> {
    const questions = await Question.find();
    return questions;
  }

  static async getQuestionById(id: string): Promise<Question> {
    const question = await Question.findOneBy({ id: id });
    if (!question) {
      throw new Error("La question n'existe pas ");
    }
    return question;
  }

  static async updateQuestion(
    id: string,
    questionData: Partial<editOrCreateQuestion>
  ): Promise<Question> {
    const question = await Question.findOneBy({ id: id });
    if (!question) {
      throw new Error("La question n'existe pas ");
    }
    await Question.update(id, questionData);
    await question?.reload();

    return question;
  }

  static async deleteQuestion(id: string): Promise<void> {
    const { affected } = await Question.delete(id);
    if (affected === 0) {
      throw new Error("La question n'existe pas ");
    }
  }
}
