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
import { Category } from "../entities/category";

@ArgsType()
export class editOrCreateCategory {
  @Field()
  name!: string;
}

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  getCategories() {
    return Category.getCategories();
  }

  @Query(() => Category)
  getCategory(@Arg("id", () => ID) id: string) {
    return Category.getCategoryById(id);
  }

  @Mutation(() => Category)
  newCategory(@Args() args: editOrCreateCategory) {
    return Category.newCategory(args);
  }

  @Mutation(() => Category)
  updateCategory(
    @Arg("id", () => ID) id: string,
    @Args() args: editOrCreateCategory
  ) {
    return Category.updateCategory(id, args);
  }

  @Mutation(() => Category)
  deleteCategory(@Arg("id", () => ID) id: string) {
    return Category.deleteCategory(id);
  }
}
