import { Resolvers } from "../../types";
import { PAGE_SIZE } from "../shared/shared.constants";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
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
        const followers = await client.user
          .findUnique({
            where: { username },
          })
          .followers({
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
          });
        const totalFollowers = await client.user.count({
          where: {
            followings: {
              some: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / PAGE_SIZE),
        };
      } catch (error) {
        return {
          ok: false,
          error: "Cannot show followers",
        };
      }
    },
  },
};
export default resolvers;
