const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false, // Har bir foydalanuvchi uchun alohida
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
