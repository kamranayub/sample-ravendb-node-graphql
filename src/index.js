require("dotenv").config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");
const db = require("./db");

const app = express();

// Initialize Raven document store
// Should be done once per application start
const store = db.initializeStore();

// Construct a schema, using GraphQL schema language
const typeDefs = fs
  .readFileSync(path.join(__dirname, "schema.graphql"))
  .toString();
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Build per-request context
// and attach Raven session so
// resolvers can access it
const context = req => {
  const session = store.openSession();

  return {
    store,
    session
  };
};

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(req => ({ schema, context: context(req) }))
);
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // if you want GraphiQL enabled

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);

  // Create database if it doesn't exist
  console.info("Creating database if it doesn't exist...");
  await db.createIfNotExists(store);

  // Seed it if needed
  console.info("Seeding database with initial dataset");
  await db.seed(store);

  console.log("All set, query away!");
});
