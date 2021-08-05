import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import client from "../../client";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, { username, email, password, name }, __) => {
      try {
        // Check that the username / email aren't taken
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "This username/email is already taken",
          };
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a user
        await client.user.create({
          data: {
            username,
            email,
            name,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error: "Cannot create account",
        };
      }
    },
  },
};

export default resolvers;
