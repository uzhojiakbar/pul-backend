const Category = require("../models/Category");

// Kategoriyalarni olish
exports.getCategories = async (req, res) => {
  const { type } = req.query; // "income" yoki "expense"
  try {
    const filters = { userId: req.user.id };
    if (type) filters.type = type; // Turi bo‘yicha filter
    const categories = await Category.find(filters);
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Kategoriyalarni olishda xatolik yuz berdi." });
  }
};

// Kategoriya qo'shish
exports.createCategory = async (req, res) => {
  const { name, type = "income", emoji } = req.body;

  if (!name || !["income", "expense"].includes(type)) {
    return res
      .status(400)
      .json({ error: "Kategoriya nomi va turi noto‘g‘ri." });
  }

  try {
    const newCategory = new Category({
      name,
      type,
      userId: req.user.id,
      emoji,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kategoriya qo‘shishda xatolik yuz berdi." });
  }
};

// Kategoriya o'chirish
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findOneAndDelete({ _id: id, userId: req.user.id });
    res.json({ message: "Kategoriya muvaffaqiyatli o‘chirildi." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Kategoriya o‘chirishda xatolik yuz berdi." });
  }
};
