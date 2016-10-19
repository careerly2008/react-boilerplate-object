/* eslint-disable no-console */

const express = require('express');
const apolloExpress = require('apollo-server').apolloExpress;
const graphiqlExpress = require('apollo-server').graphiqlExpress;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const bodyParser = require('body-parser');
const argv = require('minimist')(process.argv.slice(2));
const typeDefs = require('./data/schema');
const resolvers = require('./data/resolvers');

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 8080;

const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/ide', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/', bodyParser.json(), apolloExpress({
  schema: executableSchema,
}));

app.listen(port, () => console.log(
  `GraphQL Server is now running on http://localhost:${port}/graphql`
));
