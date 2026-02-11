import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, batch, role, cur_role, company, location } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email and password are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
        }

        const key = String(email).toLowerCase().trim()

        const userAlreadyExists = await User.findOne({ email: key });

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await User.create({
            fullName: fullName.trim().charAt(0).toUpperCase() + fullName.trim().slice(1),
            email: key,
            password: hashedPassword,
            batch: batch || undefined,
            role: role || 'student',
            cur_role: cur_role || undefined,
            company: company || undefined,
            location: location || undefined
        });

        // jwt
        generateTokenAndSetCookie(res, createUser._id);

        const { password: _, ...userWithoutPassword } = createUser._doc;

        res.status(201).json({
            success: true,
            message: "user Created Successfully",
            user: userWithoutPassword
        })

    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}


export const login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const key = String(email).toLowerCase().trim()

        const findUser = await User.findOne({ email: key });

        if (!findUser) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const checkPassword = await bcrypt.compare(password, findUser.password)

        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        generateTokenAndSetCookie(res, findUser._id);

        await User.findOneAndUpdate({ email: key }, { lastLogin: new Date() });

        const { password: _, ...userWithoutPassword } = findUser._doc;

        res.status(200).json({
            success: true, message: "Logged in successfully",
            user: userWithoutPassword
        })
    }
    catch (err) {
        console.log("Login error:", err)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Logged out successfully" })
}


export const checkAuth = async (req, res) => {
    try {
        const findUser = await User.findById(req.user._id);

        if (!findUser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const { password: _, ...userWithoutPassword } = findUser._doc;
        res.status(200).json({ success: true, user: userWithoutPassword })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, ...otherFields } = req.body;
        let updatedFields = { ...otherFields };

        if (profilePic) {
            // If it's a base64 string (new upload), upload to cloudinary
            if (profilePic.startsWith("data:image")) {
                const uploaded = await cloudinary.uploader.upload(profilePic);
                updatedFields.profilePic = uploaded.secure_url;
            } else {
                // If it's already a URL, just save it (or ignore if no change)
                updatedFields.profilePic = profilePic;
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updatedFields,
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        console.log("Profile Update Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};
