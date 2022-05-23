import { gql } from "apollo-server-express";

export const Account = gql`
  type Account @key(fields: "_id", resolvable: false) {
    _id: ObjectID!
  }
`;
