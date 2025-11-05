import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
    ,
    expiredAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

// tu dong xoa session khi qua thoi gian expiredAt
sessionSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model('Session', sessionSchema);
export default Session;
