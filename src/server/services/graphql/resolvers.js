/**
 * The resolvers object holds all types as a property. We set up RootQuery, holding the posts query in the same way as we did in our schema. The resolvers object must equal the schema but recursively merged. If you want to query a subfield, such as the user of a post, you have to extend the resolvers object with a Post object containing a user function next to RootQuery.

If we send a query for all posts, the posts function is executed. There, you can do whatever you want, but you need to return something that matches the schema. So, if you have an array of posts as the response type of RootQuery, you cannot return something different, such as just one post object instead of an array. In that case, you would receive an error.

Furthermore, GraphQL checks the data type of every property. If id is defined as Int, you cannot return a regular MongoDB id since these ids are of type String. GraphQL would throw an error too.
Our posts query will return an empty array, which would be a correct response for GraphQL. 

 */
 const resolvers = {
    RootQuery: {
        posts(root, args, context) {
            return [];
            },
        },
    };
    
    export default resolvers;