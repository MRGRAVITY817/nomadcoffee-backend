import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    createdAt: String!
    updatedAt: String!
    name: String!
    username: String!
    email: String!
    githubUsername: String
    avatarURL: String
    location: String
    followers(page: Int): [User]
    followings(page: Int): [User]
  }
  type SeeUserResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeUser(id: Int!): SeeUserResult!
  }
`;
