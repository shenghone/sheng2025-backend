import { gql } from "graphql-tag";

export default gql`
  extend type Query {
    Me: AuthorType 
  }

  extend type Mutation {
    SignUp(Email: String!, Password: String!, AuthorName: String!): AuthorType
    SignIn(Email: String!, Password: String!): AuthorType 
    SignOut: Boolean 
  }

  type AuthorType {
    id: ID!
    AuthorName: String!
    Email: String!
    Password: String!
  }
`;