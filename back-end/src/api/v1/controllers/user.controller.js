const bcrypt = require("bcryptjs");
const User = require("../../../models/user.model");
const createToken = require("../../../middlewares/jwt");

module.exports.getUserProfile = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

module.exports.updateUserProfile = async (req, res) => {};

module.exports.registerUser = async (req, res) => {
  try {
    const checkUser = await User.find({ email: req.body.email });
    if(checkUser.length > 0) {
      return res.status(500).json({ message: "Error registering user", error });
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name: name,
      email: email,
      password: hashedPassword
    });
    await newUser.save();
    const users = await User({});
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Email not found." });
    }
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password invalid." });
    }
    const token = createToken(email);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ accessToken: token });
  } catch (error) {
    res.status(500).json({ message: "Error login user", error });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    res.status(200).json({ message: "Logout success!" });
  }
};

module.exports.changeUserPassword = async (req, res) => {};
