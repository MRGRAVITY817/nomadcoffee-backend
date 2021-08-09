import { Resolvers } from "../types";
import { PAGE_SIZE } from "./shared/shared.constants";

const resolvers: Resolvers = {
  User: {
    followings: ({ id }, { page }, { client }) =>
      client.user.findFirst({ where: { id } }).followers({
        take: PAGE_SIZE,
        skip: page ? (page - 1) * PAGE_SIZE : 0,
        orderBy: { id: "asc" },
      }),
    followers: ({ id }, { page }, { client }) =>
      client.user.findFirst({ where: { id } }).followings({
        take: PAGE_SIZE,
        skip: page ? (page - 1) * PAGE_SIZE : 0,
        orderBy: { id: "asc" },
      }),
  },
  Query: {
    seeUser: async (_, { id }, { client }) => {
      try {
        const user = await client.user.findUnique({ where: { id } });
        return {
          ok: true,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Cannot see user",
        };
      }
    },
  },
};

export default resolvers;
