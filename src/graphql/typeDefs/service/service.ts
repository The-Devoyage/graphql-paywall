import { gql } from "apollo-server-express";

export const Service = gql`
  type Service {
    _id: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    created_by: User!
    name: String!
    limits: [Limit!]!
  }

  type Limit {
    name: String!
    scopes: [Scope!]!
  }

  type Scope {
    paywall: Paywall!
    quantity: Int!
  }
`;
