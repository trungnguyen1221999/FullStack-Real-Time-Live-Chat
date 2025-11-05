import { MAXAGE } from '../../Constant.js';
import { generateAccessToken, generateRefreshToken } from '../helper/generateToken.js';
import Session from '../models/Session.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
export const Signup = async(req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
        if(!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields are required' , success: false, error: true});
        }

        const duplicate = await User.findOne({username});
        if(duplicate) {
            return res.status(409).json({ message: 'Username already exists', success: false, error: true });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Tạo displayName từ firstName và lastName
        const displayName = `${firstName} ${lastName}`;
        
        const newUser = await User.create({ 
            username, 
            email, 
            hashedPassword: hashedPassword, 
            displayName: displayName
        });
        const userWithoutPassword = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            displayName: newUser.displayName,
            avatarUrl: newUser.avatarUrl,
            bio: newUser.bio,
            phone: newUser.phone
        };

        return res.status(201).json({ message: 'User registered successfully', success: true, error: false, user: userWithoutPassword });
    } catch (error) {
        console.error('Error occurred during signup:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }
}

export const Signin = async(req, res) => {

    try{
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({ message: 'Username and password are required', success: false, error: true });
        }
        const user = await User.findOne({ username }).select('+hashedPassword');
        if(!user) {
            return  res.status(401).json({ message: 'Invalid username or password', success: false, error: true });
        }
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if(!isMatch) {
            return  res.status(401).json({ message: 'Invalid username or password', success: false, error: true });
        }
        
        //create accessToken 
        const accessToken = generateAccessToken( user._id );

        //create refreshToken
        const refreshToken = generateRefreshToken( user._id );

        //tao session ms de luu refreshToken
        await Session.create({
            userId: user._id,
            refreshToken: refreshToken,
            expiredAt: new Date(Date.now() + 7*24*60*60*1000) //7 ngay
        });

        //tra refreshToken ve trong cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', // backend va frontend khac domain  -> dung Strict neu cung domain
            maxAge: MAXAGE
        });
        res.status(200).json({ message: 'Signin successful', user: user, success: true, error: false, accessToken });

        //tra accessToken ve client
    }
    catch (error) {
        console.error('Error occurred during signin:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }
}

export const Signout = async(req, res) => {
try {
    //lay refreshToken tu cookie
    const refreshToken = req.cookies?.refreshToken;
    if(refreshToken){

    //xoa refreshToken trong Session
    await Session.deleteOne({ refreshToken });

    //xoa cookie tren trinh duyet
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'

    });
    return res.sendStatus(204);

}
}
catch (error) {
    console.error('Error occurred during signout:', error);
    res.status(500).json({ message: 'Internal server error', success: false, error: true });
}
}
//tao accessToken moi khi refreshToken hop le
export const refreshToken = async (req, res) => {
    try {
        //lay refreshToken tu cookie
        const refreshToken = req.cookies?.refreshToken;
        if(!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided', success: false, error: true });
        }
        //kiem tra refreshToken trong db
        const session = await Session.findOne({ refreshToken });
        if(!session) {
            return res.status(403).json({ message: 'Invalid refresh token', success: false, error: true });
        }

        //kiem tra het han chua
        if(session.expiredAt < new Date()) {
            return res.status(403).json({ message: 'Refresh token has expired', success: false, error: true });
        }

        //tao accessToken moi
        const accessToken = generateAccessToken(session.userId);

        //tra ve client
        res.status(200).json({ message: 'Access token refreshed successfully', success: true, error: false, accessToken });
    }
    catch (error) {
        console.error('Error occurred during signout:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }   }