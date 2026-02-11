import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import User from "../models/user.model.js";
import Message from "../models/Message.model.js";
export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const myRole = req.user.role;
    let filter = { _id: { $ne: loggedInUserId } };
    if (myRole === "student") {
      filter.role = "alumni";
    }
    if (myRole === "alumni") {
      filter.role = "student";
    }
    const users = await User.find(filter).select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.log("Error in getAllContacts:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getMessagesbyUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const userToChatId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessagesbyUserId:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;
    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }

    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.findById(receiverId);
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    let imageUrl = null;
    if (image) {
      const uploaded = await cloudinary.uploader.upload(image);
      imageUrl = uploaded.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });
    const receiverSocketId = getRecieverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);

  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ message: "Error sending message", error: err.message });
  }
};
export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId }
      ]
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map(msg =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      )
    ];
    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds }
    }).select("-password");
    res.status(200).json(chatPartners);
  } catch (err) {
    console.log("Error in getChatPartners:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUnreadCounts = async (req, res) => {
  try {
    const userId = req.user._id;
    // Aggregation pipeline to count unread messages grouped by sender
    const unreadCounts = await Message.aggregate([
      {
        $match: {
          receiverId: userId,
          isRead: false
        }
      },
      {
        $group: {
          _id: "$senderId",
          count: { $sum: 1 }
        }
      }
    ]);

    // Transform array to object { senderId: count }
    const countsMap = unreadCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.status(200).json(countsMap);
  } catch (err) {
    console.log("Error in getUnreadCounts:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderId = req.params.id;

    await Message.updateMany(
      { senderId: senderId, receiverId: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (err) {
    console.log("Error in markMessagesAsRead:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
