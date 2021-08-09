import { Resolvers } from "../../types";
import { protectedResolver } from "../shared/shared.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleFollow: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        try {
          const user = await client.user.findUnique({
            where: { username },
            include: { followers: true },
          });
          if (!user) {
            return {
              ok: false,
              error: "User not found",
            };
          }

          const isFollowing = user.followers
            .map((f) => f.id)
            .includes(loggedInUser.id);

          isFollowing
            ? await client.user.update({
                where: {
                  id: loggedInUser.id,
                },
                data: {
                  followings: { disconnect: { username } },
                },
              })
            : await client.user.update({
                where: {
                  id: loggedInUser.id,
                },
                data: {
                  followings: { connect: { username } },
                },
              });

          return {
            ok: true,
            following: !isFollowing,
          };
        } catch (error) {
          return {
            ok: false,
            error: "Cannot toggle follow",
          };
        }
      }
    ),
  },
};

export default resolvers;
