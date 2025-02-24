import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { logger } from '../config/logger.js';

dotenv.config();

export const generateJWT = (payload, key = process.env.SECRET_KEY_JWT, expiresIn = '1h') => {
    return jwt.sign(payload, key, { expiresIn });
}

export const verifyJWT = (token, key = process.env.SECRET_KEY_JWT) => {
    try {
        return jwt.verify(token, key);
    } catch (error) {
        logger.error("JWT Verification Error: ", error);
        throw new Error("Invalid or expired token");
    }
}
