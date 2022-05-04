import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { ApolloServer } from "apollo-server-express";
import { schema } from "@src/graphql";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import express from "express";
import cors from "cors";
import { Router } from "./routes";

dotenv.config();

const app = express();
app.use(Router);

app.use(cors());
app.use(express.json());

async function startServer() {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => Helpers.Subgraph.GenerateContext({ req }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

startServer();

const DB = process.env.MONGO_URI;

if (DB) {
  mongoose
    .connect(DB)
    .then(() => console.log("Mongo DB Connected..."))
    .catch((err) => console.log(err));
} else {
  console.log("DB Not Connected - Mongo URI Missing");
}

const port = process.env.PORT || 5999;

app.listen(port, () => console.log(`PAYWALL ====> UP ON PORT ${port}`));
