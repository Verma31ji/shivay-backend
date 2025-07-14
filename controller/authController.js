import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import transporter from '../config/nodeMailer.js';
import AdminModel from '../Models/adminModel.js';

// Register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, msg: "Missing details" });
    }

    try {
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, msg: "Admin already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const admin = new AdminModel({ name, email, password: hashPassword });
        await admin.save();

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: "Admin Account Created - Shivay Films",
            text: `Hello Admin ${name}, your admin account has been successfully created using email: ${email}`
        });

        res.status(200).json({ success: true, msg: "Admin registered successfully!" });

    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ success: false, msg: "Missing details" });

    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin)
            return res.status(404).json({ success: false, msg: "Admin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch)
            return res.status(401).json({ success: false, msg: "Invalid password" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true, msg: "Login success", adminId: admin._id, isAccountVerified: admin.isAccountVerified });

    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
        });
        res.status(200).json({ success: true, msg: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Send OTP for email verification
export const sendVerifyOtp = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.adminId);

        if (admin.isAccountVerified) {
            return res.status(400).json({ success: false, msg: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        admin.verifyOtp = otp;
        admin.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
        await admin.save();

        await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: admin.email,
            subject: "Admin Email Verification OTP - Shivay Films",
            html: `<p>Verify your admin account using this OTP: <strong>${otp}</strong></p>`
        });

        res.status(200).json({ success: true, msg: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Verify OTP
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp)
        return res.status(400).json({ success: false, msg: "Missing details" });

    try {
        const admin = await AdminModel.findById(userId);
        if (!admin || admin.verifyOtp !== otp || admin.verifyOtpExpiresAt < Date.now()) {
            return res.status(400).json({ success: false, msg: "Invalid or expired OTP" });
        }

        admin.isAccountVerified = true;
        admin.verifyOtp = '';
        admin.verifyOtpExpiresAt = 0;
        await admin.save();

        res.status(200).json({ success: true, msg: "Account verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Check Auth
export const isAuthenticated = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ success: false, msg: "No token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded?.id) return res.status(403).json({ success: false, msg: "Invalid token" });

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(401).json({ success: false, msg: "Unauthorized" });
    }
};

// Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, msg: "Please provide your email" });

    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin) return res.status(400).json({ success: false, msg: "Admin not found" });

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        admin.resetOtp = otp;
        admin.resetOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
        await admin.save();

        await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: "Admin Password Reset OTP - Shivay Films",
            text: `Your OTP for password reset is ${otp}`
        });

        res.status(200).json({ success: true, msg: "OTP sent to your email" });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, msg: "Missing details" });
    }

    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin || admin.resetOtp !== otp || admin.resetOtpExpiresAt < Date.now()) {
            return res.status(400).json({ success: false, msg: "Invalid or expired OTP" });
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        admin.resetOtp = '';
        admin.resetOtpExpiresAt = 0;
        await admin.save();

        res.status(200).json({ success: true, msg: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};
