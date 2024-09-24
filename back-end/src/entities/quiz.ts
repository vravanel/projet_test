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
import User from "./user";

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
  isFinish!: boolean;

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

  @ManyToOne(() => User, (user) => user.quizz, {
    eager: true,
  })
  @Field(() => User)
  user!: User;

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
      if (quiz.isFinish !== undefined) {
        this.isFinish = quiz.isFinish;
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
    const category = await Category.getCategoryById(quizData.categoryId);
    newQuiz.category = category;
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
    const quiz = await Quiz.getQuizById(id);
    if (!quiz) {
      throw new Error("Ce quiz n'existe pas");
    }
    Object.assign(quiz, quizData);
    if (quizData.categoryId) {
      quiz.category = await Category.getCategoryById(quizData.categoryId);
    }
    await quiz.save();
    await quiz.reload();
    return quiz;
  }

  static async deleteQuiz(id: string): Promise<Quiz> {
    const quiz = await Quiz.getQuizById(id);
    await Quiz.delete(id);
    return quiz;
  }

  static async getQuizByCategory(id: string): Promise<Quiz[]> {
    const quiz = await Quiz.find({
      where: { category: { id: id } },
      relations: ["category"],
    });
    return quiz;
  }
}
