import express from "express";
import Word from "../models/Word.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// criar palavra
router.post("/", async (req, res) => {
  try {
    const { term, translation, categoryId, listId } = req.body;

    const word = await Word.create({
      term,
      translation,
      categoryId,
      listId,
      userId: req.userId,
    });

    const populatedWord = await Word.findById(word._id)
      .populate("categoryId", "name")
      .populate("listId", "name");

    res.status(201).json(populatedWord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listar palavras do usuário
router.get("/", async (req, res) => {
  const words = await Word.find({ userId: req.userId })
    .populate("categoryId", "name")
    .populate("listId", "name");

  res.json(words);
});

// editar palavra
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { term, translation, categoryId, listId } = req.body;

  const word = await Word.findOneAndUpdate(
    { _id: id, userId: req.userId }, // segurança: só edita do dono
    { term, translation, categoryId, listId },
    { new: true },
  )
    .populate("categoryId", "name")
    .populate("listId", "name");

  if (!word) {
    return res.status(404).json({ message: "Palavra não encontrada" });
  }

  res.json(word);
});

// deletar palavra
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const word = await Word.findOneAndDelete({
    _id: id,
    userId: req.userId, // segurança: só deleta do dono
  });

  if (!word) {
    return res.status(404).json({ message: "Palavra não encontrada" });
  }

  res.status(204).send();
});

export default router;
