/**
 * Let's represent a basic schema, which would be able to at least serve the fake posts array.
 * First, we define a new type called "Post". A Post type has "id" as Int and "text" as String
 */

/**
 * First, we define a new type called Post. A Post type has id as Int and text as String.

For our GraphQL server, we need a type called RootQuery. The RootQuery type wraps all of the queries a client can run. It can be anything from requesting all posts, all users, or posts by just one user, and so on. You can compare this to all GET requests as you find them with a common REST API. The paths would be /posts, /users, and /users/ID/posts to represent the GraphQL API as a REST API. When using GraphQL, we only have one route, and we send the query as a JSON-like object.

The first query we will have is going to return an array of all of the posts we have got.

If we query for all posts and want to return each user with its corresponding post, this would be a sub-query that would not be represented in our RootQuery type but in the Post type itself. You will see how it is done.

At the end of the JSON-like schema, we add RootQuery to the schema property. This type is the starting point for the Apollo Server.

Later, we are going to add the mutation key to the schema where we implement a RootMutation type. It is going to serve all of the actions a user can run. Mutations are comparable to the POST, UPDATE, PATCH, and DELETE requests of a REST API.

At the end of the file, we export the schema as an array. If we wanted to, we could push other schemas to this array to merge them.

The last thing missing here is the implementation of our resolvers.


 */
const typeDefinitions = `
type Post {
id: Int
text: String
}

type RootQuery {
posts: [Post]
}

schema {
query: RootQuery
}
`;

export default [typeDefinitions];