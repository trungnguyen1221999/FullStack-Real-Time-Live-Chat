import Friend from '../models/friends.js';
import User
 from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';
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
        const { requestId } = req.params;
        const userId = req.user._id;
        const request = await FriendRequest.findById(requestId);
        if(!request){
            return res.status(404).json({ message: 'Friend request not found', success: false, error: true });
        }
        if(request.to.toString() !== userId.toString()){
            return res.status(403).json({ message: 'You are not authorized to accept this friend request', success: false, error: true });
        }
        const friend = await Friend.create({ userA: request.from, userB: request.to });
        await FriendRequest.findByIdAndDelete(requestId);
        const from = await User.findById(request.from).select('_id displayName avatarUrl').lean();
        return res.status(200).json({ message: 'Friend request accepted successfully', success: true, error: false, newFriend: {
            _id: from?._id,
            displayName: from?.displayName,
            avatarUrl: from?.avatarUrl

        } });
    }
    catch (error) {
        console.error('Error occurred while accepting friend request:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};  

export const declineFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user._id;
        const request = await FriendRequest.findById(requestId);
        if(!request){
            return res.status(404).json({ message: 'Friend request not found', success: false, error: true });
        }
        if(request.to.toString() !== userId.toString()){
            return res.status(403).json({ message: 'You are not authorized to decline this friend request', success: false, error: true });
        }
        await FriendRequest.findByIdAndDelete(requestId);
        return res.status(200).json({ message: 'Friend request declined successfully', success: true, error: false });
    }
    catch (error) {
        console.error('Error occurred while declining friend request:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};  

export const getAllFriends    = async (req, res) => {
    try {
        const userId = req.user._id;
        const friendShips = await Friend.find({ 
            $or: [
                { userA: userId },
                { userB: userId }
            ]
        }).populate('userA', '_id displayName avatarUrl').populate('userB', '_id displayName avatarUrl').lean();
        if(!friendShips.length){
            return res.status(404).json({ message: 'No friendships found', success: false, error: true });
        }
        const friendList = friendShips.map(fs => {
            return fs.userA._id.toString() === userId.toString() ? fs.userB : fs.userA;
        });
        return res.status(200).json({ message: 'Friendships fetched successfully', success: true, error: false, friendList });
    }
    catch (error) {
        console.error('Error occurred while fetching all friends:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};  
export const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const populateFields = '_id username displayName avatarUrl';
        const [sent, received] = await Promise.all([
            FriendRequest.find({ from: userId }).populate('to', populateFields).lean(),
            FriendRequest.find({ to: userId }).populate('from', populateFields).lean()
        ]);
        return res.status(200).json({ message: 'Friend requests fetched successfully', success: true, error: false, requests: { sent, received } });
    }
    catch (error) {
        console.error('Error occurred while fetching all friends:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    } 
};