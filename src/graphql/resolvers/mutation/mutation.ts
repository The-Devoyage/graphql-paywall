import { Helpers } from "@the-devoyage/micro-auth-helpers";
import {
  MutationResolvers,
  Paywall as IPaywall,
  PaywallPurchase as IPaywallPurchase,
  Service as IService,
} from "types/generated";
import { Paywall, PaywallPurchase, Service } from "@src/models";
import { LimitRole } from "@the-devoyage/micro-auth-helpers/dist/resolver-helpers";
import { ApolloError } from "apollo-server-express";
import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";

export const Mutation: MutationResolvers = {
  createPaywall: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({
        context,
        requireAccount: true,
        requireUser: true,
      });

      Helpers.Resolver.LimitRole({
        roleLimit: 1,
        userRole: context.auth.payload.user?.role,
        errorMessage: "Only admin roles may create paywalls.",
      });

      const newPayWall = new Paywall({
        ...args.createPaywallInput,
        created_by: context.auth.payload.user?._id,
      });
      await newPayWall.save();

      const paywall = await Paywall.findOne<IPaywall>({ _id: newPayWall._id });

      if (!paywall) {
        throw new ApolloError(
          "Something went wrong when finding the new paywall."
        );
      }

      return paywall;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updatePaywall: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      LimitRole({
        userRole: context.auth.payload.user?.role,
        roleLimit: 1,
        errorMessage: "Only admin roles may update paywalls.",
      });

      const { filter } = GenerateMongo<IPaywall>({
        fieldFilters: args.updatePaywallInput.query,
      });

      const paywall = await Paywall.findOne<IPaywall>(filter);

      if (!paywall) {
        throw new Error("Paywall does not exist.");
      }

      const updated = await Paywall.findOneAndUpdate<IPaywall>(
        { _id: paywall._id },
        { ...args.updatePaywallInput.payload },
        { new: true }
      );

      if (!updated) {
        throw new Error("Something went wrong when updating this paywall.");
      }

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createPaywallPurchase: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({
        context,
        requireAccount: true,
        requireUser: true,
      });

      if (
        args.createPaywallPurchaseInput.payload.account &&
        args.createPaywallPurchaseInput.payload.account._id !==
          context.auth.payload.account?._id
      ) {
        Helpers.Resolver.LimitRole({
          roleLimit: 1,
          userRole: context.auth.payload.user?.role,
          errorMessage:
            "Only account holders and admins may create Paywall Purchases for Other Accounts.",
        });
      }

      if (
        !!args.createPaywallPurchaseInput.payload.status &&
        args.createPaywallPurchaseInput.payload.status !== "CREATED"
      ) {
        Helpers.Resolver.LimitRole({
          roleLimit: 1,
          userRole: context.auth.payload.user?.role,
          errorMessage:
            "Only admin may alter the status of a purchase that is not `CREATED`.",
        });
      }

      const newPayWallPurchase = new PaywallPurchase({
        ...args.createPaywallPurchaseInput,
        created_by: context.auth.payload.user?._id,
        account:
          args.createPaywallPurchaseInput.payload.account ??
          context.auth.payload.account?._id,
      });
      await newPayWallPurchase.save();

      const paywallPurchase = await PaywallPurchase.findOne<IPaywallPurchase>({
        _id: newPayWallPurchase._id,
      });

      if (!paywallPurchase) {
        throw new ApolloError(
          "Something went wrong when finding the new purchase."
        );
      }

      await PaywallPurchase.populate(paywallPurchase, { path: "paywall" });

      return paywallPurchase;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updatePaywallPurchase: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      LimitRole({
        userRole: context.auth.payload.user?.role,
        roleLimit: 1,
        errorMessage: "Only admin roles may update paywall purchases.",
      });

      const { filter } = GenerateMongo<IPaywallPurchase>({
        fieldFilters: args.updatePaywallPurchaseInput.query,
      });

      const paywallPurchase = await PaywallPurchase.findOne<IPaywallPurchase>(
        filter
      );

      if (!paywallPurchase) {
        throw new Error("Paywall does not exist.");
      }

      const updated = await PaywallPurchase.findOneAndUpdate<IPaywallPurchase>(
        { _id: paywallPurchase._id },
        { ...args.updatePaywallPurchaseInput.payload },
        { new: true }
      );

      if (!updated) {
        throw new Error("Something went wrong when updating this document.");
      }

      await PaywallPurchase.populate(updated, { path: "paywall" });

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createService: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({
        context,
        requireAccount: true,
        requireUser: true,
      });

      Helpers.Resolver.LimitRole({
        roleLimit: 1,
        userRole: context.auth.payload.user?.role,
        errorMessage: "Only admin level roles may create a service.",
      });

      const newService = new Service({
        ...args.createServiceInput.payload,
        created_by: context.auth.payload.user?._id,
      });
      await newService.save();

      const service = await Service.findOne<IService>({
        _id: newService._id,
      });

      if (!service) {
        throw new ApolloError(
          "Something went wrong when finding the new purchase."
        );
      }

      await Service.populate(service, { path: "limits.scopes.paywall" });

      return service;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateService: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      LimitRole({
        userRole: context.auth.payload.user?.role,
        roleLimit: 1,
        errorMessage: "Only admin roles may update services.",
      });

      const { filter } = GenerateMongo<IService>({
        fieldFilters: args.updateServiceInput.query,
      });

      const service = await Service.findOne<IService>(filter);

      if (!service) {
        throw new Error("Paywall does not exist.");
      }

      const updated = await Service.findOneAndUpdate<IService>(
        { _id: service._id },
        { ...args.updateServiceInput.payload },
        { new: true }
      );

      if (!updated) {
        throw new Error("Something went wrong when updating this service.");
      }

      await Service.populate(updated, { path: "limits.scopes.paywall" });

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
