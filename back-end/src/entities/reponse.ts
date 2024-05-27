import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Quiz } from "./quiz";
import { editOrCreateReponse } from "../resolvers/ReponseResolver";
import { Question } from "./question";

@Entity()
@ObjectType()
export class Reponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column({ nullable: true, default: false })
  @Field({ defaultValue: false, nullable: true })
  isValid!: boolean;

  @ManyToOne(() => Question, (question) => question.reponses, {
    eager: true,
  })
  @JoinColumn({ name: "questionId" })
  @Field(() => Question)
  question!: Question;

  constructor(reponse?: Partial<Reponse>) {
    super();
    if (reponse) {
      if (!reponse.title) {
        throw new Error("Le titre de la reponse est obligatoire");
      }
      this.title = reponse.title;
    }
  }

  static async newReponse(reponseData: editOrCreateReponse): Promise<Reponse> {
    const reponse = new Reponse(reponseData);
    const question = await Question.getQuestionById(reponseData.questionId);
    reponse.question = question;
    const saveReponse = await reponse.save();
    return saveReponse;
  }

  static async getReponses(): Promise<Reponse[]> {
    const reponses = await Reponse.find();
    return reponses;
  }

  static async getReponseById(id: string): Promise<Reponse> {
    const reponse = await Reponse.findOneBy({ id: id });
    if (!reponse) {
      throw new Error("La reponse n'existe pas ");
    }
    return reponse;
  }

  static async updateReponse(
    id: string,
    reponseData: Partial<editOrCreateReponse>
  ): Promise<Reponse> {
    const reponse = await Reponse.findOne({ where: { id } });
    if (!reponse) {
      throw new Error("La reponse n'existe pas ");
    }

    Object.assign(reponse, reponseData);

    if (reponseData.questionId) {
      const question = await Question.findOne({
        where: { id: reponseData.questionId },
      });
      if (!question) {
        throw new Error("La question n'existe pas");
      }
      reponse.question = question;
    }

    await reponse.save();
    await reponse.reload();
    return reponse;
  }

  static async deleteReponse(id: string): Promise<void> {
    const { affected } = await Reponse.delete(id);
    if (affected === 0) {
      throw new Error("La reponse n'existe pas ");
    }
  }
}
