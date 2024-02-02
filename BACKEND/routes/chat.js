import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from "../controllers/chat.js";
import validateToken from "../middlewares/isLoggedIn.js";

const chatRouter = express.Router();


chatRouter.route("/").post(validateToken, accessChat).get(validateToken, fetchChats); 
chatRouter.route("/group").post(validateToken, createGroupChat); 
chatRouter.route("/rename").put(validateToken, renameGroup); 
chatRouter.route("/groupadd").put(validateToken, addToGroup); 
chatRouter.route("/groupremove").put(validateToken, removeFromGroup); 

export default chatRouter;