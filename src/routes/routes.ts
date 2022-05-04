import express from "express";
import { PaywallPurchase, Service } from "@src/models";
import {
  PaywallPurchase as IPaywallPurchase,
  Service as IService,
} from "types/generated";
import mongoose from "mongoose";

export const Router = express.Router({ strict: true });

Router.get("/getPaywallPurchase/:account_id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.account_id)) {
    return res.json({ error: "Invalid Object ID" });
  }

  try {
    const paywallPurchase = await PaywallPurchase.findOne<IPaywallPurchase>({
      account: req.params.account_id,
    });

    if (!paywallPurchase) {
      return res.json({
        error: "Unable to find Paywall Purchase with this Account ID",
      });
    }

    await PaywallPurchase.populate(paywallPurchase, { path: "paywall" });

    res.json({ paywallPurchase });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

Router.get("/getService/:name", async (req, res) => {
  try {
    const service = await Service.findOne<IService>({
      name: req.params.name,
    });

    if (!service) {
      return res.json({ error: "Unable to find Service" });
    }

    await Service.populate(service, { path: "limits.scopes.paywall" });

    res.json(service);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});
