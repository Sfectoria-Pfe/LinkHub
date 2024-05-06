const express = require("express");
const { protectRoutes } = require("../middlewares/protectRoutes");

const { sendMessage, getdMessage } = require("../controllers/Messages");

const messagesRouter = express.Router();
messagesRouter.post("/send/:id", protectRoutes, sendMessage);
messagesRouter.get("/getmessage/:id", protectRoutes, getdMessage);

module.exports = messagesRouter;
