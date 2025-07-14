import jwt from 'jsonwebtoken';
import AdminModel from '../Models/adminModel.js';

const adminAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, msg: "Unauthorized. No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await AdminModel.findById(decoded.id);
        if (!admin) {
            return res.status(403).json({ success: false, msg: "Access denied. Admin not found." });
        }

        req.adminId = admin._id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: "Invalid or expired token." });
    }
};

export default adminAuth;
