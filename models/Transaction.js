const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Foydalanuvchi bilan bog'lash
    required: true,
  },
  date: {
    type: String, // Sana, masalan "2024-11-21"
    required: true,
  },
  category: {
    type: String, // Tranzaktsiya turi: "Food", "Salary" va boshqalar
    required: true,
  },
  amount: {
    type: Number, // Tranzaktsiya summasi
    required: true,
  },
  description: {
    type: String, // Tranzaktsiya summasi
    required: true,
    default: "-",
  },
  type: {
    type: String, //
    required: false,
  },
  payment: {
    type: String, // "cash", "card", "dollar"
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
