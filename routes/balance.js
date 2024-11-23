const express = require("express");
const router = express.Router();
const balanceController = require("../controllers/balanceController");
const { updateBalance } = require("../controllers/balanceController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, balanceController.getBalance);
router.put("/", authMiddleware, updateBalance);
router.post("/adjust", authMiddleware, balanceController.adjustBalance);

module.exports = router;
