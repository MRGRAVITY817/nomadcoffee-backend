import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import schema from "./schema";

dotenv.config();

const server = new ApolloServer({
  schema,
});

const PORT: string = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}`));
