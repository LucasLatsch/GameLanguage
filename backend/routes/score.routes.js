import express from "express";
import Score from "../models/Score.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);

// salvar score
router.post("/", async (req, res) => {
  const { score, totalWords, wrongAnswers } = req.body;

  const newScore = await Score.create({
    userId: req.userId,
    score,
    totalWords,
    wrongAnswers,
  });

  res.status(201).json(newScore);
});

// histórico do usuário
router.get("/me", async (req, res) => {
  const scores = await Score.find({ userId: req.userId }).sort({
    createdAt: -1,
  });

  res.json(scores);
});

// ranking global
router.get("/ranking", async (req, res) => {
  const ranking = await Score.find()
    .sort({ score: -1 })
    .limit(10)
    .populate("userId", "name email");

  res.json(ranking);
});

export default router;
