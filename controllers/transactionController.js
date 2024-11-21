const Transaction = require("../models/Transaction");

// Tranzaktsiya qo'shish
exports.addTransaction = async (req, res) => {
  const { date, category, amount, type, payment } = req.body;

  try {
    const transaction = new Transaction({
      user: req.user.id, // Middleware orqali foydalanuvchini olish
      date,
      category,
      amount,
      type,
      payment,
    });

    await transaction.save();
    res
      .status(201)
      .json({ message: "Tranzaktsiya muvaffaqiyatli qo'shildi", transaction });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Tranzaktsiyani qo'shishda xatolik yuz berdi" });
  }
};

// Tranzaktsiyalarni olish
exports.getTransactions = async (req, res) => {
  const { type, payment, startDate, endDate } = req.query;

  try {
    const filters = { user: req.user.id }; // Faqat foydalanuvchining tranzaktsiyalari
    if (type) filters.type = type; // "income" yoki "expense"
    if (payment) filters.payment = payment; // "cash", "card", "dollar"
    if (startDate && endDate) filters.date = { $gte: startDate, $lte: endDate }; // Sana oralig'i

    const transactions = await Transaction.find(filters);
    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Tranzaktsiyalarni olishda xatolik yuz berdi" });
  }
};
