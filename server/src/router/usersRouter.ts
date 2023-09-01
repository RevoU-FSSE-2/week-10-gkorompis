import express from 'express';
import {
    usersPostController,
    usersGetManyController,
    usersGetOneController,
    usersPatchOneController, 
    usersDeleteOneController
} from '../controller/usersController.js'
import { hashPassword } from '../middleware/hashPassword.js';
import { verifyToken } from '../middleware/verifyToken.js';

const app = express();
app.use(express.json());
const usersRouter = express.Router();


//routes verify token middleware
//routes

/**
 * @openapi
 * /prod/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users and Sign Up
 *     description: |
 *       This endpoint allows you to create a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: lorem
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 example: lorem@email.com
 *                 description: The email address of the user.
 *               name:
 *                 type: string
 *                 example: Lorem Ipsum
 *                 description: The name of the user.
 *               role:
 *                 type: string
 *                 example: admin
 *                 description: The role of the user (e.g., admin, user).
 *               password:
 *                 type: string
 *                 example: 1234abcd
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User creation successful
 *         content:
 *           application/json:
 *             example:
 *               acknowledged: true
 *               insertedId: 64f1db57a40680fefaa3e5ce
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates if the user creation was acknowledged.
 *                 insertedId:
 *                   type: string
 *                   description: The unique ID of the newly created user.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid request body"
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the bad request.
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             example:
 *               error: "Username already exists"
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the conflict error when the username already exists.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               code: 500
 *               message: "Internal server error"
 *               error: "Internal Server Error"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code (e.g., 500 for internal server error).
 *                 message:
 *                   type: string
 *                   description: A message describing the result.
 *                 error:
 *                   type: string
 *                   description: The error message, indicating an internal server error.
 */


usersRouter.post("/", hashPassword, usersPostController);
usersRouter.get("/", verifyToken,usersGetManyController);
usersRouter.get("/:id", verifyToken, usersGetOneController);
usersRouter.get("/username", verifyToken, usersGetOneController);
usersRouter.patch("/:id", verifyToken, usersPatchOneController);
usersRouter.delete("/:id",verifyToken, usersDeleteOneController);

export default usersRouter;