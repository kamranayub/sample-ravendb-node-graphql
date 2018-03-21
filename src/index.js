const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');

const app = express();

// Construct a schema, using GraphQL schema language
const schema = graphql.buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const rootValue = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(process.env.PORT || 4000);