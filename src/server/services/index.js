/**
 * This code requires our index.js file from the graphql folder and re-exports all services in one big object. We can define further services here if we need them.

To make our GraphQL server publicly accessible to our clients, we are going to bind the Apollo Server to the /graphql path.

Import the services index.js file in the server/index.js
 */
import graphql from './graphql';

export default {
    graphql,
};