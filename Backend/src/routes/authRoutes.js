import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import PendingUser from "../models/PendingUser.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login",
    }),
    (req, res) => {

        const token = jwt.sign(
            { userId: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.redirect("http://localhost:5173/welcome");
    }
);

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email, provider: "local" });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, user);

        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.log("Server error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "name, email and password are required"
            });
        }

        const existingUser = await User.findOne({
            email,
            provider: "local"
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = await PendingUser.create({
            name,
            email,
            password: hashPassword,
            provider: "local",
            isVerified: false,
            verificationCode: code,
            verificationCodeExpires: Date.now() + 10 * 60 * 1000 // 10 minutes from now
        });

        await sendVerificationEmail(email, code);

        return res.status(201).json({
            message: "Signup successful. Please check your email for the verification code.",
            
        })

        
    } catch (error) {
        console.log("Server error:", error);
        return res.status(500).json({
            message: "server error"
        });
    }
});

router.post("/verify-email", async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.isVerified) return res.status(400).json({ message: "Already verified" });
        if (user.verificationCode !== code) return res.status(400).json({ message: "Invalid code" });
        if (user.verificationCodeExpires < Date.now()) return res.status(400).json({ message: "Code expired" });

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();

        generateTokenAndSetCookie(res, user);

        return res.status(200).json({
            message: "Email verified",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.log("Server error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


// LOGOUT
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
});

// GET CURRENT USER
// router.get("/me", protect, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if (!user) return res.status(404).json({ message: "User not found" });
//         return res.status(200).json({ user });
//     } catch (error) {
//         console.log("Server error:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// });


export default router;