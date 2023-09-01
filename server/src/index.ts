// lambda.js
import express from 'express';
import cors from 'cors'
import serverless from 'serverless-http';
import usersRouter from './router/usersRouter.js';
import transactionsRequestRouter from './router/transactionsRequestRouter.js';
import authRouter from './router/authRouter.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';


// import transactionsRouter from './routes/transactionsRoutes.js';
// import authRouter from './routes/authRoutes.js';
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'week-10',
            version: '1.0.0'
        },
        components: {
          securitySchemas: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: "JWT"
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ],
        tags: [
          {
              name: 'Users and Sign Up',
              description: 'Endpoints related to Sign Up',
          },
          {
              name: 'Sign In',
              description: 'Endpoints related to Sign In',
          },
          {
              name: 'Transactions Request',
              description: 'Endpoints related to transaction request',
          },
        ]
    },
    apis: ["./router/usersRouter.js",  "./router/authRouter.js", "./router/transactionsRequestRouter.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
console.log(swaggerDocs);

const app = express();


app.use(cors())
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use("/users", usersRouter)
app.use("/transactionsRequest", transactionsRequestRouter)
app.use("/auth", authRouter)


app.get("/hello", (req, res)=>{
    res.json({message: "How Much Api Routes Week 10 #10"});
});

//for testing
app.listen(5001, ()=>{
    console.log('server is listening at port 5001 testing #2')
})

export const handler = serverless(app);

