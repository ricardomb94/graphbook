
(import path from 'path') : The path module offers many functionalities for working with the directory structures.


/**
 * To make our GraphQL server publicly accessible to our clients, we are going to bind the Apollo Server to the /graphql path
 */

/*
    const app = express() : We initialize the server with the express command. The result is stored in the app variable. Everything our back end does is executed through this object.
*/





/*
    Routing configuration
    We use the global __dirname variable to get our project's root directory. 
    The variable holds the path of the current file

    Using path.join with ../../ and __dirname gives us the real root of our project
    const root = path.join(__dirname, '../../');
*/

/*
    Express.js provides the "use" function which runs a series of commands when a given path matches. When executing this function without a path, it is executed for every request.
*/

/*
    We use this feature to serve our static files (the avatar images) with express.static. They include bundle.js and bundle.css, created by npm run client:build
*/

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));

/*
    app.use(helmet()) : Helmet is a tool that allows you to set various HTTP headers to secure your application.
*/


/*
    We add some XSS(Cross-Site-Scripting) protection tactics and remove the X-Powered-By HTTP header and some other useful things just by using the helmet() function in the first line.
    To ensure that no one can inject malicious code, we are using the "Content-Security-Policy HTTP header".This header prevents attackers from loading resources from external URLs.
    We also specify the imgSrc field, which tells our client that only images from these URLs should be loaded, including Amazon Web Services (AWS)
 */
app.use(helmet.contentSecurityPolicy({ 
    directives: {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

/*
   app.use(compress()) : Enabling compression for Express.js saves you and your user bandwidth.This middleware compresses all responses going through it.
  */


/*
    This command handles all of the problems we usually have with cross-origin requests at once. It merely sets a wildcard with * inside of Access-Control-Allow-Origin, allowing anyone from anywhere to use your API, at least in the first instance. You can always secure your API by offering API keys or by only allowing access to logged-in users. Enabling CORS only allows the requesting site to receive the response.

    Furthermore, the command also implements the OPTIONS route for the whole application.

    The OPTIONS method or request is made every time we use Cross-origin resource sharing. This action is what's called a preflight request, which ensures that the responding server trusts you. If the server does not respond correctly to the OPTIONS preflight, the actual method, such as POST, will not be made by the browser at all.
 */
app.use(cors);


/*
    The services object only holds the graphql index. Now we must bind the GraphQL server to the Express.js web server with the following code:const serviceNames = Object.keys(services) 
 */


/*
    For convenience, we loop through all indexes of the services object and use the index as the name of the route the service will be bound to. The path would be /example for the example index in the services object. For a typical service, such as a REST interface, we rely on the standard app.use method of Express.js.

    Since the Apollo Server is kind of special, when binding it to Express.js, we need to run the applyMiddleware function provided by the initialized Apollo Server and avoid using the app.use function of Express.js. Apollo automatically binds itself to the /graphql path because it is the default option. You could also include a path parameter if you want it to respond from a custom route.
    
    for (let i = 0; i < serviceNames.length; i += 1) {
        const name = serviceNames[i];
        if (name === 'graphql') {
            services[name].applyMiddleware({ app });
        } else {
            app.use(`/${name}`, services[name]);
        }
    }   
*/

