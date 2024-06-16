const bcrypt = require("bcryptjs");
const User = require("../../../models/user.model");
const Blacklisting = require("../../../models/blacklist.model");
const ConfirmCode = require("../../../models/confirm-code.model");
const Feedback = require("../../../models/feedback.model");
const createToken = require("../../../middlewares/jwt");
const mailOptions = require("../../../helper/mail");
const createRandomFourDigit = require("../../../helper/confirm");
const nodemailer = require("nodemailer");

module.exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error get profile user", error });
  }
};

module.exports.editUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { userName, userEmail } = req.body;

    const updateData = {};
    if (userName) {
      updateData.name = userName;
    }
    if (userEmail) {
      updateData.email = userEmail;
    }
    if (Object.keys(updateData).length > 0) {
      await User.findByIdAndUpdate(userId, updateData, { new: true });
      res.json({ message: "Edit user profile successful!" });
    } else {
      res.status(400).json({ message: "No valid fields to update" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error get profile user", error });
  }
};

module.exports.userRegister = async (req, res) => {
  try {
    const checkUser = await User.find({ email: req.body.email });
    if (checkUser.length > 0) {
      return res.status(500).json({ message: "Error registering user", error });
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      avatar: req.file.path,
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    const users = await User({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Email not found." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password invalid." });
    }
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7200000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.cookie("email", email, {
      httpOnly: true,
      expires: new Date(Date.now() + 7200000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.cookie("avatar", user.avatar, {
      httpOnly: true,
      expires: new Date(Date.now() + 7200000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ accessToken: token, avatarUrl: user.avatar });
  } catch (error) {
    res.status(500).json({ message: "Error login user", error });
  }
};

module.exports.userLogout = async (req, res) => {
  try {
    const authHeader = await req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;
    const userId = req.user.userId;
    if (token) {
      const newBlacklist = await new Blacklisting({
        userId: userId,
        token: token,
        expiresAt: new Date(Date.now() + 7200000),
      });
      await newBlacklist.save();
    }
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logout!" });
  }
};

module.exports.handleFeedback = async (req, res) => {
  try {
    const { name, email, text } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
    const user = await User.findOne({ email: email });
    if(!user) {
      return res.status(404).json({ message: "Error" });
    }
    let feedback = await Feedback.findOne({ userId: user.id });
    if(feedback) {
      feedback.feedbackList.push({
        text: text,
        sendingTime: new Date()
      });
    } else {
      feedback = new Feedback({
        userId: user.id,
        feedbackList: [
          {
            text: text,
            sendingTime: new Date()
          }
        ],
        createdAt: new Date()
      });
    }
    await feedback.save();
    const subject = `Dear ${name}. Thank you for your contribution`;
    const message = `Your contribution has been recognized by us.`;
    const userMailOptions = mailOptions(email, subject, message);
    await transporter.sendMail(userMailOptions);
    res.json({ message: "Success !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching from the database." });
  }
};

module.exports.handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Error !"});
    }
    const randomFourDigit = createRandomFourDigit();
    const newConfirmCode = new ConfirmCode({
      email: email,
      code: randomFourDigit.toString()
    });
    await newConfirmCode.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
    const subject = `You have submitted a password reset request.`;
    const message = `This is your confirmation code ${randomFourDigit}. Please do not share this code with anyone.`;
    const userMailOptions = mailOptions(email, subject, message);
    await transporter.sendMail(userMailOptions);
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Error handle !." });
  }
};

module.exports.userConfirm = async (req, res) => {
  try {
    const { code } = req.body;
    const confirmCode = await ConfirmCode.findOne({ code: code });
    if (!confirmCode || confirmCode.status === true) {
      return res.status(404).send({ message: "Invalid code !" });
    }
    await ConfirmCode.findOneAndUpdate({ code: code }, { status: true });
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Error handle !." });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Error handle !." });
  }
};