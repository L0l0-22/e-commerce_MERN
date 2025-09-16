import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register endpoint
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // التأكد من أن الإيميل غير مسجل مسبقًا
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // تشفير الباسورد
    const hashedPassword = await bcrypt.hash(password, 10); //saltrounds=10

    // إنشاء مستخدم جديد
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    
    await user.save();

    // ✅ generate token after successful registration
    const token = generateJWT(user._id);

    res.status(201).json({ message: "User registered successfully", userId: user._id , token }); //lazem 27welo l json
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login endpoint
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ generate token here
    const token = generateJWT(user._id);

    // success
    res.status(200).json({ 
      message: "User logged in successfully", 
      userId: user._id ,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const generateJWT = (userId) =>{
  return jwt.sign(
    { id: userId },                // payload
    "supersecretkey123",        // secret key (store in .env)
    { expiresIn: "1h" }            // options (token expires in 1 hour)
  );
}