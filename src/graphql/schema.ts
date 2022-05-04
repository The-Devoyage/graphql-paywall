import { buildSubgraphSchema } from "@apollo/federation";
import { typeDefs } from "@src/graphql/typeDefs";
import { resolvers } from "@src/graphql/resolvers";
import { GraphQL } from "@the-devoyage/mongo-filter-generator";

export const schema = buildSubgraphSchema([
  { typeDefs: typeDefs.Paywall },
  { typeDefs: typeDefs.PaywallPurchase },
  { typeDefs: typeDefs.User },
  { typeDefs: typeDefs.Account },
  { typeDefs: typeDefs.Service },
  { typeDefs: typeDefs.Query, resolvers: resolvers.Query },
  { typeDefs: typeDefs.Mutation, resolvers: resolvers.Mutation },
  { typeDefs: GraphQL.typeDefs, resolvers: GraphQL.resolvers },
]);
