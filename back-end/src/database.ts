import { DataSource } from "typeorm";
import { Category } from "./entities/category";
import { Question } from "./entities/question";
import { Quiz } from "./entities/quiz";
import { Reponse } from "./entities/reponse";
import User from "./entities/user";
import UserSession from "./entities/userSession";

let dataSource: DataSource;

export const getDataSource = async () => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "postgres",
      url:
        process.env.NODE_ENV === "test"
          ? process.env.TEST_DATABASE_URL
          : process.env.DATABASE_URL,
      entities: [Category, User, Reponse, Question, Quiz, UserSession],
      synchronize: true,
    });
    await dataSource.initialize();
  }
  return dataSource;
};
