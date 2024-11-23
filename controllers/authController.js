const User = require("../models/User.js");
const Balance = require("../models/Balance.js"); // Balance modelini import qilish
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Kerakli ma'lumotlarni hammasi yuborilmagan!" });
  }

  const user = await User.findOne({ username });
  if (user) return res.status(400).json({ error: "Foydalanuvchi mavjud" });

  try {
    // Foydalanuvchini yaratish
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();

    // Foydalanuvchi uchun bo'sh balans yozuvi yaratish
    const newBalance = new Balance({
      userId: newUser._id,
      all: {
        uzs: 0,
        usd: 0,
      },
      uzs: 0,
      usd: 0,
      card: 0,
    });
    await newBalance.save();

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
