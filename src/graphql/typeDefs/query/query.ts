import { gql } from "apollo-server-express";

export const Query = gql`
  type GetPaywallsResponse {
    data: [Paywall!]!
    stats: Stats!
  }

  type GetPaywallPurchasesResponse {
    data: [PaywallPurchase!]!
    stats: Stats!
  }

  type GetServicesResponse {
    data: [Service!]!
    stats: Stats!
  }

  input GetPaywallsInput {
    _id: StringFieldFilter
    createdAt: StringFieldFilter
    updatedAt: StringFieldFilter
    created_by: StringFieldFilter
    config: FilterConfig
    productId: StringFieldFilter
    status: StringFieldFilter
    name: StringFieldFilter
  }

  input GetServicesInput {
    _id: StringFieldFilter
    createdAt: StringFieldFilter
    updatedAt: StringFieldFilter
    created_by: StringFieldFilter
    config: FilterConfig
    name: StringFieldFilter
  }

  input GetPaywallPurchasesInput {
    _id: StringFieldFilter
    createdAt: StringFieldFilter
    updatedAt: StringFieldFilter
    created_by: StringFieldFilter
    config: FilterConfig
    account: StringFieldFilter
    paywall: StringFieldFilter
    status: StringFieldFilter
  }

  extend type Query {
    getPaywalls(getPaywallsInput: GetPaywallsInput!): GetPaywallsResponse!
    getPaywallPurchases(
      getPaywallPurchasesInput: GetPaywallPurchasesInput!
    ): GetPaywallPurchasesResponse!
    getServices(getServicesInput: GetServicesInput!): GetServicesResponse!
  }
`;
