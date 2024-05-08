import { Query, Resolver } from "type-graphql";
import { Category } from "../entities/category";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  getCategories() {
    return;
  }
}
