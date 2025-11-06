import Friend from '../models/friendModel.js';
import User
 from '../models/User.js';
 import  FriendRequest from '../models/friendRequestModel.js';

export const addFriend = async (req, res) => {
    try {
        const {to, message} = req.body;
        const from = req.user._id;
        if(from === to){
            return res.status(400).json({ message: 'You cannot send friend request to yourself', success: false, error: true });
        }
        const userExists = await User.exists({_id: to});
        if(!userExists){
            return res.status(404).json({ message: 'User not found', success: false, error: true });
        }
        let userA = from.toString();
        let userB = to.toString();
        if( userA > userB ){
            [userA, userB] = [userB, userA];
        }
        const [alreadyFriends, existingRequest] = await Promise.all([
            Friend.findOne({ userA, userB }),
            FriendRequest.findOne({ 
                $or: [
                    { from, to },
                    { from: to, to: from }
                ]
             })
        ]);
        if(alreadyFriends){
            return res.status(400).json({ message: 'You are already friends with this user', success: false, error: true });
        }
        if(existingRequest){
            return res.status(400).json({ message: 'A friend request already exists between you and this user', success: false, error: true });
        }
        const request = await FriendRequest.create({ from, to, message });
        return  res.status(201).json({ message: 'Friend request sent successfully', success: true, error: false, request });
    }
    catch (error) {
        console.error('Error occurred while adding friend:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};  

export const acceptFriendRequest = async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Error occurred while accepting friend request:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};  

export const declineFriendRequest = async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Error occurred while declining friend request:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};  

export const getAllFriends    = async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Error occurred while fetching all friends:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};  
export const getFriendRequests = async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Error occurred while fetching all friends:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};