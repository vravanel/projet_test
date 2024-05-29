import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import User from "./entities/user";
import { UserResolver } from "./resolvers/UserResolver";
import { AuthChecker } from "type-graphql";
import { Response } from "express";
import { getUserSessionIdFromCookie } from "./utils/cookie";
import { getDataSource } from "./database";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { QuestionResolver } from "./resolvers/QuestionResolver";
import { QuizResolver } from "./resolvers/QuizResolver";
import { ReponseResolver } from "./resolvers/ReponseResolver";

export type Context = { res: Response; user: User | null };

const authChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

const buildSchemaAsync = async () => {
  const { buildSchema } = await import("type-graphql");
  return buildSchema({
    resolvers: [
      CategoryResolver,
      QuestionResolver,
      QuizResolver,
      ReponseResolver,
      UserResolver,
    ],
    validate: true,
    authChecker,
  });
};

const startServer = async () => {
  const schema = await buildSchemaAsync();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }): Promise<Context> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      return { res: res as Response, user };
    },
  });

  await getDataSource();

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
