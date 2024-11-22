const Category = require("../models/Category");

// Kategoriyalarni olish
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id });
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Kategoriyalarni olishda xatolik yuz berdi." });
  }
};

// Kategoriya qo'shish
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Kategoriya nomi bo‘sh bo‘lmasligi kerak." });
  }

  try {
    const newCategory = new Category({ name, userId: req.user.id });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
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
    res
      .status(500)
      .json({ error: "Kategoriya o‘chirishda xatolik yuz berdi." });
  }
};
