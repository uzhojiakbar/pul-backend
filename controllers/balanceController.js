const Balance = require("../models/Balance");

const axios = require("axios");

// Valyuta kursini olish
const getExchangeRate = async () => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    return response.data.rates.UZS;
  } catch (error) {
    console.error("Valyuta kursini olishda xatolik:", error);
    return 12000; // Default kurs
  }
};
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

exports.getBalance = async (req, res) => {
  try {
    const balance = await Balance.findOne({ userId: req.user.id });
    if (!balance) {
      return res.status(404).json({ message: "Balans topilmadi!" });
    }

    // Valyuta kursini olish
    const exchangeRate = await getExchangeRate();

    // Dinamik balansni qaytarish
    const dynamicBalance = {
      ...balance.toObject(),
      all: {
        uzs: balance.all.uzs,
        usd: (balance.all.uzs / exchangeRate).toFixed(2), // Umumiy USD balansi
      },
    };

    res.status(200).json(dynamicBalance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Balansni olishda xatolik yuz berdi." });
  }
};

const updateBalance1 = async (req, res) => {
  try {
    const { all, uzs, usd } = req.body;

    let balance = await Balance.findOne({ userId: req.user.id });

    if (!balance) {
      balance = new Balance({
        userId: req.user.id,
        all,
        uzs,
        usd,
      });
    } else {
      balance.all.uzs = all?.uzs ?? balance.all.uzs;
      balance.uzs = uzs ?? balance.uzs;
      balance.usd = usd ?? balance.usd;
    }

    await balance.save();
    res
      .status(200)
      .json({ message: "Balans muvaffaqiyatli yangilandi!", balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Balansni yangilashda xatolik yuz berdi.1" });
  }
};

exports.updateBalance = updateBalance1;
exports.adjustBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, currency, type } = req.body;

    if (!amount || !currency || !type) {
      return res.status(400).json({ error: "Hamma maydonlarni to'ldiring!" });
    }

    await updateBalance(userId, amount, currency, type);

    res.status(200).json({ message: "Balans muvaffaqiyatli yangilandi!" });
  } catch (error) {
    console.error("Balansni yangilashda xatolik:", error);
    res.status(500).json({ error: "Balansni yangilashda xatolik yuz berdi." });
  }
};
