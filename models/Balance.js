const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Bog'lanish `User` modeliga
    required: true,
    unique: true, // Bir foydalanuvchiga faqat bitta balance
  },
  all: {
    uzs: { type: Number, default: 0 },
    usd: { type: Number, default: 0 },
  },
  uzs: { type: Number, default: 0 },
  usd: { type: Number, default: 0 },
  card: { type: Number, default: 0 },
});

const Balance = mongoose.model("Balance", balanceSchema);

module.exports = Balance;
