import { DataSource } from "typeorm";
import { Category } from "./entities/category";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Category],
  synchronize: true,
});

const buildSchemaAsync = async () => {
  const { buildSchema } = await import("type-graphql");
  return buildSchema({
    resolvers: [CategoryResolver],
    validate: true,
  });
};

const startServer = async () => {
  const schema = await buildSchemaAsync();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  await dataSource.initialize();

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
