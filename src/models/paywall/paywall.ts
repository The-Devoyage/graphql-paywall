import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import { Paywall as IPaywall, PaywallStatusEnum } from "types/generated";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaywallSchema = new Schema<IPaywall, FindAndPaginateModel>(
  {
    status: {
      type: String,
      required: true,
      default: "INACTIVE" as PaywallStatusEnum.Inactive,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Paywall = mongoose.model<IPaywall, FindAndPaginateModel>(
  "Paywall",
  PaywallSchema
);

export { Paywall };
