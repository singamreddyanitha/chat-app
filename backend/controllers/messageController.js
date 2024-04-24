import Conversation from "../models/conversationModels.js";
import Message from "../models/messageModel.js";

export const sendeMessage = async (req, res) => {
    // console.log("message sent", req.params.id);

    try {

        const {message} = req.body;
        const {id: receiverId} = req.params;  // (or) const id = req.params.id; any one is correct.
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]} 
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            }) 
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // SOCKET TO FUNCTIONALITY WILL GO HERE

        // this will not run parallely means it will wait for the previous one to be completed or executed completely.

        // await conversation.save();
        // await newMessage.save();
        
        // this will run parallel 
        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getMessage = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES 

        if(!conversation) {
            return res.status(200).json([]);
        } 

        const messages = conversation.messages;

        res.status(200).json(messages);
        
    }catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export default getMessage;