const graphqlHTTP = require("express-graphql");

module.exports = (schema, rootValue) => graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
});
