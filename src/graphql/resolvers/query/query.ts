import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import {
  QueryResolvers,
  Paywall as IPaywall,
  PaywallPurchase as IPaywallPurchase,
  Service as IService,
} from "types/generated";
import { Paywall, PaywallPurchase, Service } from "@src/models";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Query: QueryResolvers = {
  getPaywalls: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo<IPaywall>({
        fieldFilters: args.getPaywallsInput.query,
        config: args.getPaywallsInput?.config,
      });

      const paywalls = await Paywall.findAndPaginate<IPaywall>(
        filter,
        options,
        {
          history: {
            filter: {
              interval: args.getPaywallsInput.config?.history?.interval ?? [],
            },
          },
        }
      );

      return paywalls;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getPaywallPurchases: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo<IPaywallPurchase>({
        fieldFilters: args.getPaywallPurchasesInput.query,
        config: args.getPaywallPurchasesInput?.config,
      });

      const purchases = await PaywallPurchase.findAndPaginate<IPaywallPurchase>(
        filter,
        options,
        {
          history: {
            filter: {
              interval:
                args.getPaywallPurchasesInput.config?.history?.interval ?? [],
            },
          },
        }
      );

      await PaywallPurchase.populate(purchases.data, { path: "paywall" });

      return purchases;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getServices: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo<IService>({
        fieldFilters: args.getServicesInput.query,
        config: args.getServicesInput?.config,
      });

      const services = await Service.findAndPaginate<IService>(
        filter,
        options,
        {
          history: {
            filter: {
              interval: args.getServicesInput.config?.history?.interval ?? [],
            },
          },
        }
      );

      await Service.populate(services.data, { path: "limits.scopes.paywall" });

      return services;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
