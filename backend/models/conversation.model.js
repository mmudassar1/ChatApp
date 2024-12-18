import mongoose from "mongoose";
import User from "../models/user.model.js";
import Message from "./message.model.js";

const ConversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message,
            default: null
        }
    ]
}, { timestamps: true })

const Conversation = mongoose.model('conversation', ConversationSchema);
export default Conversation;