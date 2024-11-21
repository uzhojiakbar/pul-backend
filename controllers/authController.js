const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Kerakli malumotlarni hammasi yuborilmagan!" });
  }

  const user = await User.findOne({ username });
  if (user) return res.status(400).json({ error: "Foydalanuvchi mavjud" });

  try {
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Ro'yxatdan o'tishda xatolik" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ error: "Foydalanuvchi topilmadi" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Noto'g'ri parol" });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({
      token,
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: "Kirishda xatolik" });
  }
};
