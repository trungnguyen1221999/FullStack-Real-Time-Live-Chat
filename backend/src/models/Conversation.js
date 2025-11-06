import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    }
);

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        _id: false,
    }
);  

const lastMessageSchema = new mongoose.Schema(
    {
        _id: { type: String },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            default: null, 
            required: true,
        },
        createdAt: {
            type: Date,
            default: null
        },
    }
);

const conversationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["direct", "group"],
            required: true,
        },
        participants: [
            {
                type: [participantSchema],
                required: true,
            },
        ],
        group: { 
            type: groupSchema,
        },
        lastMessageAt: {
            type: Date,
        },
        lastMessage: {
            type: lastMessageSchema,
            default: null,
        },
        unreadCounts: {
            type: Map,
            of: Number,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

conversationSchema.index({ "participants.userId": 1, lastMessageAt: -1 });
export default mongoose.model("Conversation", conversationSchema);
