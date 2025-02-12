import Admin from "../models/adminModel.js";
import { generateJWT } from "../helpers/jwt.js";

const authController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Missing email or password' });
        }

        try {
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(404).json({ success: false, error: 'Admin not found' });
            }

            const isMatch = await admin.comparePassword(password);
            if (isMatch) {
                return res.status(401).json({ success: false, error: 'Invalid password' });
            }

            const token = generateJWT({ email: admin.email, id: admin._id });

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token, 
                admin: {
                    id: admin._id,
                    email: admin.email,
                    username: admin.username
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'An error occurred during login' });
        }
    }
};

export default authController;
