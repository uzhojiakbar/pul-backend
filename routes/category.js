const express = require("express");
const { getCategories, createCategory, deleteCategory } = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Kategoriyalarni boshqarish uchun marshrutlar
router.get("/", authMiddleware, getCategories);
router.post("/", authMiddleware, createCategory);
router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;
