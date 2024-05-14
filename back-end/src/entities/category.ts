import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { editOrCreateCategory } from "../resolvers/CategoryResolver";
import { Quiz } from "./quiz";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => Quiz, (quiz) => quiz.category)
  @Field(() => [Quiz])
  quizz!: Quiz[];

  constructor(category?: Partial<Category>) {
    super();
    if (category) {
      if (!category.name) {
        throw new Error("Le nom de la catégorie est obligatoire");
      }
      this.name = category.name;
    }
  }

  static async newCategory(
    categoryData: editOrCreateCategory
  ): Promise<Category> {
    const category = new Category(categoryData);
    const saveCategory = await category.save();
    return saveCategory;
  }

  static async getCategories(): Promise<Category[]> {
    const categories = await Category.find();
    return categories;
  }

  static async getCategoryById(id: string): Promise<Category> {
    const category = await Category.findOneBy({ id: id });
    if (!category) {
      throw new Error("La categorie n'existe pas ");
    }
    return category;
  }

  static async updateCategory(
    id: string,
    categoryData: Partial<editOrCreateCategory>
  ): Promise<Category> {
    const category = await Category.findOneBy({ id: id });
    if (!category) {
      throw new Error("La categorie n'existe pas ");
    }
    await Category.update(id, categoryData);
    await category?.reload();

    return category;
  }

  static async deleteCategory(id: string): Promise<void> {
    const { affected } = await Category.delete(id);
    if (affected === 0) {
      throw new Error("La categorie n'existe pas ");
    }
  }
}
