import { gql } from "apollo-server-express";

export const Mutation = gql`
  input CreatePaywallInput {
    product_id: ID!
    status: PaywallStatusEnum
    description: String!
    name: String!
  }

  input CreatePaywallPurchaseInput {
    account: ObjectID
    paywall: ObjectID!
    status: PaywallPurchaseStatusEnum
  }

  input CreateServiceInput {
    name: String!
    limits: [PaywallLimitInput!]!
    webhook: String
  }

  input UpdatePaywallInput {
    paywall: GetPaywallsInput!
    product_id: ID
    status: PaywallStatusEnum
    description: String
    name: String
  }

  input UpdatePaywallPurchaseInput {
    paywallPurchase: GetPaywallPurchasesInput!
    account: ObjectID
    status: PaywallPurchaseStatusEnum
  }

  input UpdateServiceInput {
    service: GetServicesInput!
    name: String
    limits: [PaywallLimitInput!]
    webhook: String
  }

  input PaywallLimitInput {
    name: String!
    scopes: [ScopeInput!]!
  }

  input ScopeInput {
    paywall: ObjectID!
    quantity: Int!
  }

  extend type Mutation {
    createPaywall(createPaywallInput: CreatePaywallInput!): Paywall!
    updatePaywall(updatePaywallInput: UpdatePaywallInput!): Paywall!

    createService(createServiceInput: CreateServiceInput!): Service!
    updateService(updateServiceInput: UpdateServiceInput!): Service!

    createPaywallPurchase(
      createPaywallPurchaseInput: CreatePaywallPurchaseInput!
    ): PaywallPurchase!
    updatePaywallPurchase(
      updatePaywallPurchaseInput: UpdatePaywallPurchaseInput!
    ): PaywallPurchase!
  }
`;
