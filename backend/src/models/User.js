import mongoose from 'mongoose';
import {DEFAULT_AVATAR_URL} from '../../Constant.js';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    },
    lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  hashPassword: {
    type: String,
    required: [true, 'Password is required'],
    select: false // Don't include password in query results by default
  },
  displayName: {
    type: String,
    trim: true,
  },
  avatarUrl: {
    type: String,
    default: DEFAULT_AVATAR_URL
  },
  avatarId: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: ''
  },
  phone : {
    type: String,
    sparse: true,
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ phone: 1 });

const User = mongoose.model('User', userSchema);

export default User;