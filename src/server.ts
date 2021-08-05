import * as dotenv from "dotenv";
import * as express from "express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/shared/shared.utils";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import client from "./client";

dotenv.config();
const PORT: string = process.env.PORT;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

app.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
