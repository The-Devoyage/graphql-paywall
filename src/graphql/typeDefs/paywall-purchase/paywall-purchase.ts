import { gql } from "apollo-server-express";

export const PaywallPurchase = gql`
  type PaywallPurchase {
    _id: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    created_by: User!
    account: Account!
    paywall: Paywall!
    status: PaywallPurchaseStatusEnum!
  }

  enum PaywallPurchaseStatusEnum {
    CREATED
    ACTIVE
    INACTIVE
  }
`;
