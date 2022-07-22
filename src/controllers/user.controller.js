import User from "../models/user.model.js";

// POST /auth/register
export const register_user = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });
  try {
    await user.save();
    await user.generateAuthToken();

    res.status(201).json({
      username: user.username,
      email: user.email,
      token: user.token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /auth/login
export const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    await user.generateAuthToken();

    res.status(200).json({
      username: user.username,
      email: user.email,
      token: user.token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /auth/logout
export const logout_user = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    user.token = "";
    await user.save();

    res.status(204).json(null);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /auth/user
export const get_user = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
