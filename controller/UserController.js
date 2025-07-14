// controllers/userController.js
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../model/UserModel.js'
import transporter from '../config/nodeMailer.js'


const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const invalidAliasRegex = /\+.+@gmail\.com$/; // blocks test+123@gmail.com

export const UserRegister = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password || !phone)
        return res.status(400).json({ success: false, msg: "Missing Details" });

    if (!gmailRegex.test(email) || invalidAliasRegex.test(email))
        return res.status(400).json({ success: false, msg: "Only valid Gmail addresses are allowed (no aliases)" });

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ success: false, msg: "User Already Registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ name, email, phone, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: `Team Shivaay Films 🎬, Welcome Mr/Mrs.${user.name}`,
            text: `Hello Mr/Mrs. ${user.name}, You have successfully registered using ID: ${user.email}`,
        });

        return res.status(200).json({ success: true, msg: "User Registered Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};


export const UserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ success: false, msg: "Missing Details" });

    if (!gmailRegex.test(email) || invalidAliasRegex.test(email))
        return res.status(400).json({ success: false, msg: "Only valid Gmail addresses are allowed to login" });

    try {
        const user = await UserModel.findOne({ email });
        if (!user)
            return res.status(404).json({ success: false, msg: "User Not Found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ success: false, msg: "Invalid Password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict"
        });

        await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: `Team Shivaay Films 🎬, Welcome Mr/Mrs.${user.name}`,
            text: `Hello Mr/Mrs. ${user.name}, You have successfully logged in using ID: ${user.email}`,
        });

        return res.status(200).json({
            success: true,
            msg: "User LogIn Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};



export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        secure: process.env.NODE_ENV === "production"
    });
    return res.status(200).json({ success: true, msg: "User logged out successfully" });
};
