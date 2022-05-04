import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import {
  PaywallPurchase as IPaywallPurchase,
  PaywallPurchaseStatusEnum,
} from "types/generated";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaywallPurchaseSchema = new Schema<
  IPaywallPurchase,
  FindAndPaginateModel
>(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "CREATED" as PaywallPurchaseStatusEnum,
    },
    paywall: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Paywall",
    },
  },
  { timestamps: true }
);

const PaywallPurchase = mongoose.model<IPaywallPurchase, FindAndPaginateModel>(
  "PaywallPurchase",
  PaywallPurchaseSchema
);

export { PaywallPurchase };
