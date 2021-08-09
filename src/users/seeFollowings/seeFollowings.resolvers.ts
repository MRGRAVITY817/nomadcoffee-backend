import { Resolvers } from "../../types";
import { PAGE_SIZE } from "../shared/shared.constants";

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (_, { username, lastId }, { client }) => {
      try {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        const followings = await client.user
          .findUnique({ where: { username } })
          .followings({
            take: PAGE_SIZE,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
          });
        return {
          ok: true,
          followings,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Cannot show followings",
        };
      }
    },
  },
};
