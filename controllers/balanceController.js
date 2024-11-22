const Balance = require("../models/Balance");

// Foydalanuvchi balansini olish
exports.getBalance = async (req, res) => {
  try {
    const balance = await Balance.findOne({ userId: req.user.id });
    if (!balance) {
      return res.status(404).json({ message: "Balans topilmadi!" });
    }
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Yangi balans yaratish yoki mavjudini yangilash
exports.updateBalance = async (req, res) => {
  try {
    const { all, uzs, usd, card } = req.body;

    let balance = await Balance.findOne({ userId: req.user.id });

    if (!balance) {
      balance = new Balance({
        userId: req.user.id,
        all,
        uzs,
        usd,
        card,
      });
    } else {
      balance.all = all || balance.all;
      balance.uzs = uzs || balance.uzs;
      balance.usd = usd || balance.usd;
      balance.card = card || balance.card;
    }

    await balance.save();
    res
      .status(200)
      .json({ message: "Balans muvaffaqiyatli yangilandi!", balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
