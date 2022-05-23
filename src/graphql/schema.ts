import { typeDefs } from "@src/graphql/typeDefs";
import { resolvers } from "@src/graphql/resolvers";
import { GraphQL } from "@the-devoyage/mongo-filter-generator";
import { gql } from "apollo-server-express";
import { buildSubgraphSchema } from "@apollo/subgraph";

export const federation2 = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key", "@shareable"])
`;

export const schema = buildSubgraphSchema([
  { typeDefs: federation2 },
  { typeDefs: typeDefs.Paywall },
  { typeDefs: typeDefs.PaywallPurchase },
  { typeDefs: typeDefs.User },
  { typeDefs: typeDefs.Account },
  { typeDefs: typeDefs.Service },
  { typeDefs: typeDefs.Query, resolvers: resolvers.Query },
  { typeDefs: typeDefs.Mutation, resolvers: resolvers.Mutation },
  { typeDefs: GraphQL.typeDefs, resolvers: GraphQL.resolvers },
]);
