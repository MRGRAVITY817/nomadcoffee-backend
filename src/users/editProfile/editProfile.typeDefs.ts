import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      name: String
      username: String
      password: String
      email: String
      githubUsername: String
      avatar: Upload
      location: String
    ): MutationResponse!
  }
`;
