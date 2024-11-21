const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Foydalanuvchi avtorizatsiya qilinmagan" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>" dan tokenni ajratib olish

  if (!token) {
    return res.status(401).json({ error: "Token topilmadi" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Tokenni tekshirish
    req.user = await User.findById(decoded.id).select("-password"); // Foydalanuvchini olish
    next(); // Keyingi middleware yoki controllerga o‘tish
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token muddati tugagan" });
    }
    res.status(401).json({ error: "Yaroqsiz token" });
  }
};

module.exports = authMiddleware;
