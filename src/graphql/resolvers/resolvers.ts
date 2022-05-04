import { Resolvers } from "types/generated/index";
import { Query } from "./query";
import { Mutation } from "./mutation";

export const resolvers: Resolvers = {
  Query: {
    Query,
  },
  Mutation: { Mutation },
};
