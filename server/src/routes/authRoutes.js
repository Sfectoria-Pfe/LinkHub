const express = require("express");
const {
  signup,
  login,
  authentificateToken,
  verifyUser,
} = require("../controllers/authConstroller");

const authRouter = express.Router();
//YAML
//itha fama haja fi west haja eb3ed zouz hrouf
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: ["auth"]
 *     summary: Create a new user
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              role:
 *                type: string
 *              telephone:
 *                type: string
 *              address:
 *                type: string
 *              avatar:
 *                type: string
 *              bio:
 *                type: string
 *              isActivee:
 *                type: boolean
 *              activationCode:
 *                type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authentificateToken);
authRouter.post("/verif/:activationCode", verifyUser);

// authRouter.post("/verifyuser/:activationCode", verifyUser);

module.exports = authRouter;
