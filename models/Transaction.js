const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // `user` maydoni talab qilinadi
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  payment: {
    type: String,
    enum: ["UZS", "USD", "KARTA"],
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
