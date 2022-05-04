import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import { Service as IService } from "types/generated";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ServiceSchema = new Schema<IService, FindAndPaginateModel>(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    limits: [
      {
        name: { type: String, required: true },
        scopes: [
          {
            paywall: {
              type: Schema.Types.ObjectId,
              ref: "Paywall",
              required: true,
            },
            quantity: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Service = mongoose.model<IService, FindAndPaginateModel>(
  "Service",
  ServiceSchema
);

export { Service };
