import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    res.send("Login controller");
};

export const logout = (req, res) => {
    res.send("Logout controller");
};