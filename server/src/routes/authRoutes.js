const express = require("express");
const {
  signup,
  login,
  authentificateToken,
  verifyUser,
} = require("../controllers/authConstroller");

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authentificateToken);
authRouter.post("/verif/:activationCode", verifyUser);

// authRouter.post("/verifyuser/:activationCode", verifyUser);

module.exports = authRouter;
