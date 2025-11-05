import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../../Constant.js';
import dotenv from 'dotenv';
dotenv.config();
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export { generateAccessToken, generateRefreshToken };