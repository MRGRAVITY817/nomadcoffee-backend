import { gql } from "apollo-server-express";

export default gql`
  type ToggleFollowResult {
    ok: Boolean!
    error: String
    following: Boolean
  }
  type Mutation {
    toggleFollow(username: String!): ToggleFollowResult!
  }
`;
