import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// criar categoria
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// listar categorias
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// deletar categoria
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
