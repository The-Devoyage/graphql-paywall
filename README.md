# The Devoyage - GraphQL Paywall

The GraphQL Paywall service allows you to limit access to your GraphQL API (Federation Supported) simply and easily. Deploy it alongside your API and limit access at the resolver/operation level. 

## Features

### Manage Paywalls

Create and manage multiple paywalls for an API - For example Silver - Gold - and Platinum paywalls. Work with subscriptions or one time purchases. 

## Use Existing Payment Services

This API does not process payments -- Instead, it responds to webhooks in order to limit or allow access. The webhook that is sent from a payments api will update the status within the local mongodb database, which is later used to limit or allow access.

### Remotely Manage Limits by Service

Limits are set and scoped to the services within an API. For example, a Users `Service` may implement a `Paywall` that allows "gold" level holders to create 5 users. 

These limits may be set as hard coded values within the service itself, or as remote values fetched from this paywall service. This enables you to manage the assets without having to hard code values on the external service.

## Support The Project / Purchase MIT License

This repository provides a GPL License by default. If you want to use this product in a private setting, you may purchase the MIT Licensed Version [Here!](https://thedevoyage.gumroad.com/l/graphql-users) -- thanks for your support!

## Tech

- Node
- Apollo Federation
- GraphQL
- JWT Authentication
- Docker

## Getting Started

### Install Dependencies

1. Login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

If you are using docker to build and run this server, you will need to pass a github token along to the build process as a build arg.

### Configure Environment Variables

All environment variables are saved in the root of this repo in a file called `.env.example`. Move this file to `.env` and fill in the variables.

### Start the server:

In Development:

```
npm run dev
```

In Production:

```
npm start
```

### Querying the Server

The server should sit behind a federated gateway. Query the gateway to query the server. Use the Apollo Sandbox generated documentation to view available queries and mutations.

The gateway should send context to this service with the following required headers.

**Required Headers**

All requests which enter this service require a `context` header as shown below.

```ts
interface Context extends Record<string, any> {
  auth: {
    account: { _id: string; email: string } | null;
    user: {
      _id: string;
      role: number;
      email: string;
    } | null;
    isAuth: boolean;
  };
  // ...context
}
```

### Extended Properties/Required Services

The users service extends federated entities from external services. The following federated services and properties are required in order to run this service. These can be manually removed, if you choose not to extend these assets.

Account

- \_id

User 

- \_id

## Usage

Once up and running, follow these steps to prep and enable the paywall throughout your API.

### 1. Create a Paywall

A `Paywall` is a reference to a product globally. Meaning, every service or subgraph within your API can share the same paywall. This object is saved to the local Mongo Database.

Use the operation `createPaywall` to create a new paywall within the service's database. A paywall is a representation of a product or membership level.

```json
{
  "createPaywallInput": {
    "name": "Gold Membership",
    "description": "The Gold Level allows you to invite up to 5 users to your account.",
    "product_id": "STRIPE_PRODUCT_ID",
  }
}
```

### 2. Create a Service and Limits

A `Service` object holds details about the services of your API. It is also saved to the local Mongo Database.

Similar to creating a Paywall, use the operation `createService` to create a configuration record for each service within your API. Below we will create a `Service` object for the `Users` service.

Each service can declare the limits that you want to enforce with a custom name. This name will later be referenced from within the service itself, in order to enforce the paywall.

```json
{
  "createServiceInput": {
    "name": "users",
    "limits": {
      "name": "activeUsers",
      "scopes": {
        "paywall": "PAYWALL_ID",
        "quantity": 5
      }
    }
  }
}
```

### 3. The Checkout Process 

As mentioned above, the actual payment process is handled at your own discretion. This service reacts to payment successes and failures to enforce the paywall.

Before the checkout process starts, create a `PaywallPurchase` using the `createPaywallPurchase` operation. The `PaywallPurchase` object that is saved to the local Mongo Databse will have the initial status of `CREATED`. Once this object created, continue with your normal checkout process for your application.

```json
{
  "createPaywallPurchaseInput": {
    "paywall": "PAYWALL_ID",
  }
}
```

Once the purchase is completed, have the purchasing platform send a webhook to the paywall service, at the `/webhook` endpoint, to update the status of the `PaywallPurchase` from `CREATED` to `ACTIVE`. You may also send a webhook to the paywall service when the payment fails (for subscriptions), allowing you to securely change the status to `INACTIVE`.

### 4. Enforce The Paywall

The enforcement takes place within the existing services of your API - for example the Users service. This is because you will need to query the quantity of the enforced criteria to compare to the limit provided by the service. There are two ways to do this.

**The Easy Way:**

Use the library `@the-devoyage/paywall-helpers` to do the heavy lifting. This library provides a helper that can be used to enforce a paywall with minimal additions to your current code base. It also provides an Apollo Server Plugin, to simplify the process even more. 

[`@the-devoyage/paywall-helpers`](http://www.google.com)


**The Manual Way:**

For each service that will need enforcement, follow this sequence of steps. Within the service:

1. Fetch the corresponding `Service` object from the Paywall Service. This can be done once, when the service starts up. The service contains the limits that should be enforced. 

```ts
const serviceName = "users";
const serviceRequest = await fetch(`http://paywall:port/getService/${serviceName}`);
const service = await serviceRequest.json();
```

You will receive the `Service` and it's limits that were previously created in step 2 above.

2. Fetch the `PaywallPurchase` each time an authenticated request enters the service. This is done for each request, as the `PaywallPurchase` contains the current status of payment associated with the `Paywall`.


```ts
const account_id = token.payload.account.id; // Pulled from a secure location.
const paywallPurchaseRequest = await fetch(`http://paywall:port/getPaywallPurchase/${account_id}`);
const paywallPurchase = await paywallPurchaseRequest.json();
```

3. Write a function to:

  - Check that the status of `PaywallPurchas` is `ACTIVE`.
  - Find the scoped Limit within the `Service` that matches the property `PaywallPurchase.paywall`. 
  - Compare the user's current quantity of the enforced criteria with the limit set within the service. 
  - Block or Permit Access
