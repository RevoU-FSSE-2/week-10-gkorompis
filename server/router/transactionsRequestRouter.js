import express from 'express';
import { transactionsRequestPostController, transactionsRequestGetManyController, transactionsRequestGetOneController, transactionsRequestPatchOneController, transactionsRequestDeleteOneController } from '../controller/transactionsRequestController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { queryOnlySelf } from '../middleware/queryOnlySelf.js';
import { updateRequestPending } from '../middleware/makerMiddleware.js';
import { updateRequestApproved, updateRequestRejected } from '../middleware/approverMiddleware.js';
import { updateRequestDeleted } from '../middleware/adminMiddleware.js';
const app = express();
app.use(express.json());
const transactionsRequestRouter = express.Router();
transactionsRequestRouter.use(verifyToken);
console.log(">>>");
/**
 * @swagger
 * /prod/transactionsRequest:
 *   post:
 *     summary: Create a new transaction request
 *     tags:
 *       - Transactions Request
 *     description: |
 *       This endpoint allows users to create a new transaction request with the provided data.
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
 *                 description: The username initiating the request.
 *               type:
 *                 type: string
 *                 example: income
 *                 description: The type of transaction (income, expense, etc.).
 *               amount:
 *                 type: string
 *                 example: "1000"
 *                 description: The transaction amount.
 *     headers:
 *       authorization:
 *         type: string
 *         example: bearer <token>
 *         description: The authorization token in the "bearer" format.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction request created successfully
 *         content:
 *           application/json:
 *             example:
 *               acknowledged: true
 *               insertedId: "64f208bcc22127c94833f8b6"
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates if the request was acknowledged.
 *                 insertedId:
 *                   type: string
 *                   description: The ID of the created request.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *     roles:
 *       - admin
 *       - approver
 *       - maker
 */
//routes
transactionsRequestRouter.post("/", updateRequestPending, transactionsRequestPostController);
/**
 * @openapi
 * paths:
 *   /prod/transactionsRequest:
 *     get:
 *       summary: Retrieve Transaction Requests
 *       tags:
 *          - Transactions Request
 *       description: |
 *         This endpoint allows you to retrieve transaction requests based on query parameters.
 *         Authentication with a valid bearer token is required to access this endpoint.
 *         Role 'admin' and 'approver' can retrieve all documents, while 'maker' can only retrieve documents that belong to their username.
 *         Accepted query parameters: All string fields in the document, including `_id`.
 *       parameters:
 *         - name: authorization
 *           in: header
 *           description: Bearer Token
 *           required: true
 *           schema:
 *             type: string
 *         - name: _id
 *           in: query
 *           description: Document ID
 *           required: false
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - _id: "64e91bb31265ae3fbb1f931d"
 *                   username: "g_maker"
 *                   type: "income"
 *                   amount: "5000"
 *                   status:
 *                     isApproved: false
 *                     isRejected: false
 *                     isDeleted: false
 *                   timestamp:
 *                     updated: "2023-08-25T21:22:56.908Z"
 *                     created: "2023-08-25T21:22:56.908Z"
 *                     resolved: null
 *                     deleted: null
 *         '400':
 *           description: Bad Request - Invalid request parameters
 *         '403':
 *           description: Unauthorized Access - Insufficient privileges
 *         '500':
 *           description: Internal Server Error - An unexpected error occurred
 */
transactionsRequestRouter.get("/", queryOnlySelf, transactionsRequestGetManyController);
transactionsRequestRouter.get("/:id", transactionsRequestGetOneController);
transactionsRequestRouter.get("/username", transactionsRequestGetOneController);
transactionsRequestRouter.patch("/:id", transactionsRequestPatchOneController);
/**
 * @openapi
 * paths:
 *   /prod/transactionsRequest/approve/{id}:
 *     patch:
 *       summary: Approve Transaction Request
 *       tags:
 *          - Transactions Request
 *       description: |
 *         This endpoint allows you to approve a transaction request by changing the status field.
 *         Authentication with a valid bearer token is required to access this endpoint.
 *         Only role 'admin' and 'approver' can approve a transaction request.
 *       parameters:
 *         - name: authorization
 *           in: header
 *           description: Bearer Token
 *           required: true
 *           schema:
 *             type: string
 *         - name: id
 *           in: path
 *           description: Transaction Request ID
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 acknowledged: true
 *                 modifiedCount: 1
 *                 upsertedId: null
 *                 upsertedCount: 0
 *                 matchedCount: 1
 *         '400':
 *           description: Bad Request - Invalid request parameters
 *         '403':
 *           description: Forbidden - Unauthorized Access
 *         '500':
 *           description: Internal Server Error - An unexpected error occurred
 */
transactionsRequestRouter.patch("/approve/:id", updateRequestApproved, transactionsRequestPatchOneController);
/**
 * @openapi
 * paths:
 *   /prod/transactionsRequest/reject/{id}:
 *     patch:
 *       summary: Reject Transaction Request
 *       tags:
 *          - Transactions Request
 *       description: |
 *         This endpoint allows you to reject a transaction request by changing the status field.
 *         Authentication with a valid bearer token is required to access this endpoint.
 *         Only role 'admin' and 'approver' can reject a transaction request.
 *       parameters:
 *         - name: authorization
 *           in: header
 *           description: Bearer Token
 *           required: true
 *           schema:
 *             type: string
 *         - name: id
 *           in: path
 *           description: Transaction Request ID
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 acknowledged: true
 *                 modifiedCount: 1
 *                 upsertedId: null
 *                 upsertedCount: 0
 *                 matchedCount: 1
 *         '400':
 *           description: Bad Request - Invalid request parameters
 *         '403':
 *           description: Forbidden - Unauthorized Access
 *         '500':
 *           description: Internal Server Error - An unexpected error occurred
 */
transactionsRequestRouter.patch("/reject/:id", updateRequestRejected, transactionsRequestPatchOneController);
/**
 * @openapi
 * paths:
 *   /prod/transactionsRequest/delete/{id}:
 *     patch:
 *       summary: Soft Delete Transaction Request
 *       tags:
 *          - Transactions Request
 *       description: |
 *         This endpoint allows you to delete a transaction request by changing the status field.
 *         Authentication with a valid bearer token is required to access this endpoint.
 *         Only role 'admin' and 'approver' can delete a transaction request.
 *       parameters:
 *         - name: authorization
 *           in: header
 *           description: Bearer Token
 *           required: true
 *           schema:
 *             type: string
 *         - name: id
 *           in: path
 *           description: Transaction Request ID
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 acknowledged: true
 *                 modifiedCount: 1
 *                 upsertedId: null
 *                 upsertedCount: 0
 *                 matchedCount: 1
 *         '400':
 *           description: Bad Request - Invalid request parameters
 *         '403':
 *           description: Forbidden - Unauthorized Access
 *         '500':
 *           description: Internal Server Error - An unexpected error occurred
 */
transactionsRequestRouter.patch("/delete/:id", updateRequestDeleted, transactionsRequestPatchOneController);
transactionsRequestRouter.delete("/:id", transactionsRequestDeleteOneController);
export default transactionsRequestRouter;
