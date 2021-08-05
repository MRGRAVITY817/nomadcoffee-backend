import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      name: String!
      username: String!
      email: String!
      password: String!
    ): MutationResponse!
  }
`;
