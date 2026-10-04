
import cloudinary from "../lib/cloudinary";
import Message from "../models/messageModel";
import User from "../models/userModel";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('fullName email profilePicture');
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error fetching users for sidebar:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getMesssagesByUserId = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { sender: myId, receiverId: userToChatId },
                { sender: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadedresponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedresponse.secure_url;
        }

        const newMessage = new Message({
            sender: senderId,
            receiverId: receiverId,
            text: text,
            image: imageUrl
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}