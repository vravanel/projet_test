import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./category";
import { editOrCreateQuiz } from "../resolvers/QuizResolver";
import { editOrCreateCategory } from "../resolvers/CategoryResolver";
import { Question } from "./question";

@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column({ default: false })
  is_finish!: boolean;

  @Field()
  @Column()
  difficulty!: string;

  @Field()
  @Column()
  image!: string;

  @ManyToOne(() => Category, (category) => category.quizz, {
    eager: true,
  })
  @Field(() => Category)
  category!: Category;

  @OneToMany(() => Question, (question) => question.quiz)
  @Field(() => [Question])
  questions!: Question[];

  constructor(quiz?: Partial<Quiz>) {
    super();

    if (quiz) {
      if (!quiz.title) {
        throw new Error("Le titre est obligatoire");
      }
      this.title = quiz.title;
      if (!quiz.description) {
        throw new Error("La description est obligatoire");
      }
      this.description = quiz.description;
      if (quiz.is_finish !== undefined) {
        this.is_finish = quiz.is_finish;
      }
      if (!quiz.difficulty) {
        throw new Error("La difficulté est obligatoire");
      }
      this.difficulty = quiz.difficulty;
      if (!quiz.image) {
        throw new Error("L'image est obligatoire");
      }
      this.image = quiz.image;
    }
  }

  static async newQuiz(quizData: editOrCreateQuiz): Promise<Quiz> {
    const newQuiz = new Quiz(quizData);
    const saveQuiz = await newQuiz.save();
    return saveQuiz;
  }

  static async getAllQuiz(): Promise<Quiz[]> {
    const quizz = await Quiz.find();
    return quizz;
  }

  static async getQuizById(id: string): Promise<Quiz> {
    const quiz = await Quiz.findOneBy({ id: id });
    if (!quiz) {
      throw new Error("Ce quiz n'existe pas");
    }
    return quiz;
  }

  static async updateQuiz(
    id: string,
    quizData: Partial<editOrCreateQuiz>
  ): Promise<Quiz> {
    const quiz = await Quiz.findOneBy({ id: id });
    if (!quiz) {
      throw new Error("Ce quiz n'existe pas");
    }
    await Quiz.update(id, quizData);
    await quiz?.reload();
    return quiz;
  }

  static async deleteQuiz(id: string): Promise<void> {
    const { affected } = await Quiz.delete(id);
    if (affected === 0) {
      throw new Error("La quiz n'existe pas ");
    }
  }
}
