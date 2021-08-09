import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowingsResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowings(username: String!, lastId: Int!): SeeFollowingsResult!
  }
`;
