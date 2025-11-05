import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();
export const protectedRoute = async (req, res, next) => {
    try {
        //lay accesstoken tu header
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader?.split(' ')[1];
        if(!accessToken) {
            return res.status(401).json({ message: 'No access token provided', success: false, error: true });
        }
        // xac nhan accesstoken hop le
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if(err) {
                return res.status(403).json({ message: 'Invalid or expired access token', success: false, error: true });
            }
            // tim user
            const user = await User.findById(decoded.userId).select('-hashedPassword');
            if(!user) {
                return res.status(404).json({ message: 'User not found', success: false, error: true });
            }
            //lay thong tin user tu token
            req.user = user;
            next();
        });
    }
    catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }
}