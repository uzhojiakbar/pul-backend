const express = require("express");
const {
  getBalance,
  updateBalance,
} = require("../controllers/balanceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Balansni olish
router.get("/", authMiddleware, getBalance);

// Balansni yaratish yoki yangilash
router.post("/", authMiddleware, updateBalance);

module.exports = router;
