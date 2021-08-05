import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      try {
        const user = await client.user.findFirst({ where: { username } });
        if (!user) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          return {
            ok: false,
            error: "Password not valid",
          };
        }
        const token = await jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
        return {
          ok: true,
          token,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Cannot log user in",
        };
      }
    },
  },
};

export default resolvers;
