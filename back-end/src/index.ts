import { DataSource } from "typeorm";
import { Category } from "./entities/category";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Category],
  synchronize: true,
});

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [CategoryResolver],
    validate: true,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  await dataSource.initialize();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
