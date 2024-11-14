// controllers/authController.js
const User = require("../Model/user");
const jwt = require("jsonwebtoken");


const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();

    const token = createToken(user);
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(400).json({ message: "User creation failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user);
    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
