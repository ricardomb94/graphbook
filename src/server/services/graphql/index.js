//Our GraphQL service must handle multiple things for initialization. Let's go through all of them one by one:

/**
 * 1) We require the apollo-server-express and graphql-tools packages.

 */
import { ApolloServer } from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
/**
 * 2) We must combine the GraphQL schema with the resolver functions. We import the corresponding schema and resolver functions at the top from separate files. The GraphQL schema is the representation of the API, that is, the data and functions a client can request or run. Resolver functions are the implementation of the schema. Both need to match 100 percent. You cannot return a field or run a mutation that is not inside the schema.
 */
import Resolvers from './resolvers';
import Schema from './schema';

/**
 * 3) The "makeExecutableSchema" function of the graphql-tools package merges the GraphQL schema and the resolver functions, resolving the data we are going to write. The "makeExecutableSchema" function throws an error when you define a query or mutation that is not in the schema. The resulting schema is executable by our GraphQL server resolving the data or running the mutations we request.
 */

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

/**
 * 4) We pass this as a schema parameter to the Apollo Server. The context property contains the request object of Express.js. In our resolver functions, we can access the request if we need to.
 */
const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => req,
});


/**
 * 5) This index.js file exports the initialized server object, which handles all GraphQL requests.
 */
export default server;