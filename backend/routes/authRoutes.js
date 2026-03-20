// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     console.log("REGISTER ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // ✅ TOKEN WITHOUT EXPIRY
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET
//     );

//     res.json({
//       token,
//       role: user.role,
//       name: user.name,
//     });
//   } catch (error) {
//     console.log("LOGIN ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;









import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ TOKEN
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
};

// ✅ ADMIN REGISTER
router.post("/admin-register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ message: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      token,
      role: user.role,
      name: user.name,
      userId: user._id, // 🔥 IMPORTANT
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ CREATE USER
router.post("/create-user", async (req, res) => {
  try {
    const { name, email, password, pin } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(pin, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pin: hashedPin,
      role: "user",
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ VERIFY PIN
router.post("/verify-pin", async (req, res) => {
  try {
    const { userId, pin } = req.body;

    if (!userId || !pin) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findById(userId);

    if (!user || !user.pin) {
      return res.status(404).json({ message: "User or PIN not found" });
    }

    const isMatch = await bcrypt.compare(String(pin), user.pin);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect PIN" });
    }

    res.json({ message: "Unlocked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;