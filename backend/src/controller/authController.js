import { generateAccessToken, generateRefreshToken } from '../helper/generateToken.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
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
        const newUser = await User.create({ username, email, hashPassword: hashedPassword, firstName, lastName });
        return res.status(201).json({ message: 'User registered successfully', success: true, error: false, user: newUser });
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
        const user = await User.findOne({ username }).select('+hashPassword');
        if(!user) {
            return  res.status(401).json({ message: 'Invalid username or password', success: false, error: true });
        }
        const isMatch = await bcrypt.compare(password, user.hashPassword);
        if(!isMatch) {
            return  res.status(401).json({ message: 'Invalid username or password', success: false, error: true });
        }
        
        //create accessToken 
        const accessToken = generateAccessToken( user._id );

        //create refreshToken
        const refreshToken = generateRefreshToken( user._id );

        //tao session ms de luu refreshToken

        //tra refreshToken ve trong cookie

        //tra accessToken ve client
    }
    catch (error) {
        console.error('Error occurred during signin:', error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }
}