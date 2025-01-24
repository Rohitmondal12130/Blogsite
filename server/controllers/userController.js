const users = require("../models/userModel");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new users({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// jdfisgf

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    // (Note: Normally, you would use bcryptjs to compare passwords, but here we do a direct comparison)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};