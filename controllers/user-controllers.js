// import
import User from "../models/user-model.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(400).json({ massage: "User Not Found" });
        return res.status(200).json({ users });
    } catch (error) {
        throw new Error(error);
    }
};

export const reagisterUsers = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashPassword = await hash(password, 10);
        const existingUsers = await User.findOne({ email });
        if (existingUsers)
            return res.status(409).json({ massage: "foydalanuvchi nomi band" });

        // Create a new user
        const newUser = new User({ email, password: hashPassword });
        await newUser.save();

        res.status(201).json({ message: "Muaffaqiyatli ro'yhatdan o'tildi" });
    } catch (error) {
        res.status(500).json({ message: `Server error`, error });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(409).json({ massage: "Foydalanuvchi topilmadi" });

        const decoded = await compare(password, user.password);
        if (!decoded)
            return res.status(403).json({ massage: "Parol noto'g'ri" });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );

        return res
            .status(200)
            .json({ massage: "Tizimga muaffaqiyatli kirish", token });
    } catch (error) {
        res.status(500).json({ message: `Server error`, error });
    }
};

export const getUserVerify = async (req, res) => {
    // This route is protected and requires a valid JWT token
    res.status(200).json({
        message: "Siz ushbu himoyalangan marshrutga kirishingiz mumkin.",
    });
};
