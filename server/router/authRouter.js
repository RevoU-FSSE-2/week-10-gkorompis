import express from 'express';
import { authPostController, } from '../controller/authController.js';
const app = express();
app.use(express.json());
const authRouter = express.Router();
/**
 * @openapi
 * /prod/auth/login:
 *   post:
 *     summary: Sign In
*     tags:
 *       - Sign In
 *     description: |
 *       This endpoint allows users to sign in by providing a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: beta
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 example: revouREVOU2023
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Successful sign-in
 *         content:
 *           text/plain:
 *             example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkR1bW15 IFRva2VuIiwiaWF0IjoxNTE2MjM5MDIyfQ.4b7exg3ibJkWZrWzFqJLh2X3K5DcY12Cw8bRQmB_qIs"
 *             schema:
 *               type: string
 *               description: The JWT token for authorization.
 *       403:
 *         description: Unauthorized access
 *         content:
 *           text/plain:
 *             example: "Unauthorized"
 *             schema:
 *               type: string
 *               description: An error message indicating unauthorized access.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           text/plain:
 *             example: "Internal Server Error"
 *             schema:
 *               type: string
 *               description: An error message indicating an internal server error.
 */
//routes
authRouter.post("/login", authPostController);
export default authRouter;
