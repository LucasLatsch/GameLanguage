import express from "express";
import Word from "../models/Word.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// criar palavra
router.post("/", async (req, res) => {
  const { term, translation } = req.body;

  const word = await Word.create({
    userId: req.userId,
    term,
    translation,
  });

  res.json(word);
});

// listar palavras do usuário
router.get("/", async (req, res) => {
  const words = await Word.find({ userId: req.userId });
  res.json(words);
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
