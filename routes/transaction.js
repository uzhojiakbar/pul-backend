const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, transactionController.getTransactions);
router.post("/", authMiddleware, transactionController.addTransaction);
router.delete(
  "/delete-all",
  authMiddleware,
  transactionController.deleteAllTransactions
);

module.exports = router;
