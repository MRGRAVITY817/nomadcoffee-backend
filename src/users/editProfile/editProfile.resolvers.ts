import { Resolvers } from "../../types";
import { protectedResolver, uploadFile } from "../shared/shared.utils";
import * as bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          name,
          username,
          email,
          githubUsername,
          password: newPassword,
          avatar,
          location,
        },
        { loggedInUser, client }
      ) => {
        try {
          let uglyPassword = null;
          if (newPassword) {
            uglyPassword = await bcrypt.hash(newPassword, 10);
          }
          let avatarURL = null;
          if (avatar) {
            avatarURL = await uploadFile(
              avatar,
              loggedInUser.id,
              "coffee-avatar"
            );
          }
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              name,
              username,
              email,
              githubUsername,
              location,
              ...(uglyPassword && { password: uglyPassword }),
              ...(avatarURL && { avatarURL }),
            },
          });
          return { ok: true };
        } catch (error) {
          return {
            ok: false,
            error: "Cannot edit profile",
          };
        }
      }
    ),
  },
};

export default resolvers;
