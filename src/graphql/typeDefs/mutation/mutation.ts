import { gql } from "apollo-server-express";

export const Mutation = gql`
  input CreatePaywallInput {
    payload: PaywallInput!
  }

  input UpdatePaywallInput {
    query: PaywallFieldFiltersInput!
    payload: PaywallInput!
  }

  input PaywallInput {
    product_id: ID!
    status: PaywallStatusEnum
    description: String!
    name: String!
  }

  input CreatePaywallPurchaseInput {
    payload: PaywallPurchaseInput!
  }

  input UpdatePaywallPurchaseInput {
    query: PaywallPurchaseFieldFiltersInput!
    payload: PaywallPurchaseInput!
  }

  input PaywallPurchaseInput {
    account: ObjectID
    paywall: ObjectID!
    status: PaywallPurchaseStatusEnum
  }

  input CreateServiceInput {
    payload: ServiceInput!
  }

  input UpdateServiceInput {
    query: ServiceFieldFiltersInput!
    payload: ServiceInput!
  }

  input ServiceInput {
    name: String!
    limits: [PaywallLimitInput!]!
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
