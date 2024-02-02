import User from "../models/user.js";
import Message from "../models/message.js";

import Chat from "../models/chat.js";

// @description     Create New Message
// @route           POST /api/Message/
// @access          Protected
export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid data passed into request",
    });
  }

  try {
    // Create a new message
    let message = await Message.create({
      sender: req.user.id, // Logged in user id,
      content,
      chat: chatId,
    });

    message = await (
      await message.populate("sender", "username")
    ).populate({
      path: "chat",
      select: "chatName isGroupChat users",
      model: "Chat",
      populate: { path: "users", select: "username email", model: "User" },
    });

    // Update latest message
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.status(201).json(message); // Send message we just created now
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to create New Message",
    });
  }
};


export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to fetch all Messages",
    });
  }
};

