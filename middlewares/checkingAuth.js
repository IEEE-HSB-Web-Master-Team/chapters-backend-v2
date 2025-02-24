import { verifyJWT } from "../helpers/jwt.js";

export const Auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
        try {
            const decoded = verifyJWT(token);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ success: false, error: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ success: false, error: 'Authorization token is required' });
    }
};
