const express = require("express");
const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST: Tranzaktsiya qo'shish
router.post("/add", authMiddleware, addTransaction);

// GET: Tranzaktsiyalarni olish
router.get("/", authMiddleware, getTransactions);

module.exports = router;
