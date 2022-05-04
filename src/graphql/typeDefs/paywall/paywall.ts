import { gql } from "apollo-server-express";

export const Paywall = gql`
  type Paywall @key(fields: "_id") {
    _id: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    created_by: User!
    product_id: ID!
    status: PaywallStatusEnum!
    description: String!
    name: String!
  }

  enum PaywallStatusEnum {
    ACTIVE
    INACTIVE
  }
`;
