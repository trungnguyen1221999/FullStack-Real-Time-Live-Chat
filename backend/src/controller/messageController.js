import { updateConversationAfterCreateMessage } from "../helper/messageHelper.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Messages.js";
export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;

    let conversation;

    if (!content) {
      return res.status(400).json({ message: "Content is missing", success: false, error: true });
    }

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }

    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId: senderId, joinedAt: new Date() },
          { userId: recipientId, joinedAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    });

    updateConversationAfterCreateMessage(conversation, message, senderId);

    await conversation.save();

    return res.status(201).json({ message , success: true, error: false });
  } catch (error) {
    console.error("Error occurred while sending direct message", error);
    return res.status(500).json({ message: "System error", success: false, error: true });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user._id;
    const conversation = req.conversation;

    if (!content) {
      return res.status(400).json({ message: "Content is missing", success: false, error: true });
    }

    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });

    updateConversationAfterCreateMessage(conversation, message, senderId);

    await conversation.save();

    return res.status(201).json({ message, success: true, error: false });
  } catch (error) {
    console.error("Error occurred while sending group message", error);
    return res.status(500).json({ message: "System error", success: false, error: true });
  }
};