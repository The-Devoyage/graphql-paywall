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
    query: PaywallFieldFiltersInput!
    config: FilterConfig
  }

  input GetServicesInput {
    query: ServiceFieldFiltersInput!
    config: FilterConfig
  }

  input GetPaywallPurchasesInput {
    query: PaywallPurchaseFieldFiltersInput!
    config: FilterConfig
  }

  input PaywallFieldFiltersInput {
    _id: [StringFieldFilter]
    createdAt: [StringFieldFilter]
    updatedAt: [StringFieldFilter]
    created_by: [StringFieldFilter]
    productId: [StringFieldFilter]
    status: [StringFieldFilter]
    name: [StringFieldFilter]
  }

  input ServiceFieldFiltersInput {
    _id: [StringFieldFilter]
    createdAt: [StringFieldFilter]
    updatedAt: [StringFieldFilter]
    created_by: [StringFieldFilter]
    name: [StringFieldFilter]
  }

  input PaywallPurchaseFieldFiltersInput {
    _id: [StringFieldFilter]
    createdAt: [StringFieldFilter]
    updatedAt: [StringFieldFilter]
    created_by: [StringFieldFilter]
    account: [StringFieldFilter]
    paywall: [StringFieldFilter]
    status: [StringFieldFilter]
  }

  extend type Query {
    getPaywalls(getPaywallsInput: GetPaywallsInput!): GetPaywallsResponse!
    getPaywallPurchases(
      getPaywallPurchasesInput: GetPaywallPurchasesInput!
    ): GetPaywallPurchasesResponse!
    getServices(getServicesInput: GetServicesInput!): GetServicesResponse!
  }
`;
