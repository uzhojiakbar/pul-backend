const Transaction = require("../models/Transaction");

const Balance = require("../models/Balance");
const axios = require("axios");

const getExchangeRate = async () => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    return response.data.rates.UZS; // USD -> UZS kursi
  } catch (error) {
    console.error("Valyuta kursini olishda xatolik:", error);
    return 12000; // Default kurs
  }
};
const updateBalance = async (userId, amount, currency, type) => {
  // Hozirgi balansni olish
  const balance = await Balance.findOne({ userId: userId });
  if (!balance) throw new Error("Balans topilmadi!");

  // Valyuta kursini olish (USD -> UZS)
  const exchangeRate = await getExchangeRate();

  let uzsEquivalent = amount; // UZS ekvivalent qiymati

  // Valyutani UZSga konvertatsiya qilish
  if (currency === "USD") {
    uzsEquivalent = amount * exchangeRate; // USD -> UZS
  } else if (currency === "KARTA") {
    uzsEquivalent = amount; // Karta UZSda saqlanadi
  } else if (currency !== "UZS") {
    throw new Error(`Notanish valyuta: ${currency}`); // Noma'lum valyuta
  }

  // Balansni yangilash
  if (type === "income") {
    // Kirim
    balance.all.uzs += uzsEquivalent; // Umumiy hisob (UZS)
    if (currency === "USD") {
      balance.all.usd += amount; // USD umumi faqat USDga qo'shiladi
      balance.usd += amount; // USD hisobini alohida yangilash
    } else if (currency === "KARTA") {
      balance.card += amount; // Karta hisobini yangilash
    } else if (currency === "UZS") {
      balance.uzs += amount; // Naqd UZS hisobini yangilash
    }
  } else if (type === "expense") {
    // Chiqim
    balance.all.uzs -= uzsEquivalent; // Umumiy hisobdan ayirish
    if (currency === "USD") {
      balance.all.usd -= amount; // USD umumi faqat USDdan ayiriladi
      balance.usd -= amount; // USD hisobini alohida yangilash
    } else if (currency === "KARTA") {
      balance.card -= amount; // Karta hisobidan ayirish
    } else if (currency === "UZS") {
      balance.uzs -= amount; // Naqd UZS hisobidan ayirish
    }
  }

  // Yangilangan balansni saqlash
  await balance.save();
};

// Tranzaktsiya qo'shish
exports.addTransaction = async (req, res) => {
  const userId = req.user.id; // Token orqali user ID ni olish
  const { date, category, amount, description, type, payment } = req.body;

  try {
    // Yangi tranzaksiyani saqlash
    const transaction = new Transaction({
      user: userId,
      date,
      category,
      amount,
      description,
      type,
      payment,
    });
    await transaction.save();

    // Balansni yangilash
    await updateBalance(userId, amount, payment, type);

    res.status(201).json({ message: "Tranzaksiya qo'shildi", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Tranzaksiyani qo'shishda xatolik" });
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
