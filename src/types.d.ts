import { PrismaClient } from ".prisma/client";

type Context = {
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => void;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};