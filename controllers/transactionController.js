const Transaction = require("../models/Transaction");
const Balance = require("../models/Balance");
const axios = require("axios");
const moment = require("moment");

// Valyuta kursini olish
const getExchangeRate = async () => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    return response.data.rates.UZS;
  } catch (error) {
    console.error("Valyuta kursini olishda xatolik:", error);
    return 12000;
  }
};

// Balansni yangilash
const updateBalance = async (userId, amount, currency, type) => {
  const balance = await Balance.findOne({ userId });
  if (!balance) throw new Error("Balans topilmadi!");

  const exchangeRate = await getExchangeRate();
  const uzsEquivalent = currency === "USD" ? amount * exchangeRate : amount;

  if (type === "income") {
    balance.all.uzs += uzsEquivalent;
    if (currency === "USD") balance.usd += amount;
    else balance.uzs += amount;
  } else if (type === "expense") {
    balance.all.uzs -= uzsEquivalent;
    if (currency === "USD") balance.usd -= amount;
    else balance.uzs -= amount;
  }

  await balance.save();
};

// Tranzaksiya qo'shish
// Tranzaksiya qo'shish

// Tranzaksiya qo'shish
exports.addTransaction = async (req, res) => {
  const userId = req.user.id;
  let { date, category, amount, description, type, typeMoney, payment } =
    req.body;

  try {
    // Sana bo'sh bo'lsa, bugungi sanani qo'shish va formatlash
    date = date
      ? moment(date).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");

    const transaction = new Transaction({
      user: userId,
      date,
      category,
      amount,
      description,
      type,
      typeMoney,
      payment,
    });
    await transaction.save();
    await updateBalance(userId, amount, payment, type);
    res.status(201).json({ message: "Tranzaksiya qo'shildi", transaction });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Tranzaksiya qo'shishda xatolik yuz berdi." });
  }
};

exports.getTransactions = async (req, res) => {
  const { type, typeMoney, payment, category, startDate, endDate } = req.query;

  try {
    const filters = { user: req.user.id }; // Foydalanuvchi bo'yicha filter
    if (type) filters.type = type; // "income" yoki "expense"
    if (typeMoney) filters.typeMoney = typeMoney; // "naqt" yoki "karta"
    if (payment) filters.payment = payment; // "UZS" yoki "USD"
    if (category) filters.category = category; // Kategoriya bo'yicha filter
    if (startDate && endDate) {
      filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) }; // Sana oralig'i
    }

    // Tartiblangan tranzaktsiyalarni olish
    const transactions = await Transaction.find(filters).sort({ date: -1 });

    // Sanani formatlash
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction.toObject(),
      formattedDate: moment(transaction.date).format("DD-MMMM-YYYY"), // Masalan, "21-November-2023"
    }));

    res.status(200).json(formattedTransactions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Tranzaktsiyalarni olishda xatolik yuz berdi." });
  }
};

exports.deleteAllTransactions = async (req, res) => {
  const userId = req.user.id; // Token orqali foydalanuvchini aniqlash

  try {
    // Foydalanuvchining barcha tranzaktsiyalarini o'chirish
    const result = await Transaction.deleteMany({ user: userId });

    res.status(200).json({
      message: "Barcha tranzaktsiyalar muvaffaqiyatli o'chirildi",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Tranzaktsiyalarni o'chirishda xatolik:", error);
    res.status(500).json({
      error: "Tranzaktsiyalarni o'chirishda xatolik yuz berdi",
    });
  }
};
