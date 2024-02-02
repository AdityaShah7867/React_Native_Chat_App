import express from "express";
import {
  sendMessage,
  allMessages,
} from "../controllers/message.js";

import validateToken  from "../middlewares/isLoggedIn.js";

const messageRouter = express.Router();

messageRouter.route("/").post(validateToken, sendMessage);
messageRouter.route("/:chatId").get(validateToken, allMessages);

export default messageRouter;