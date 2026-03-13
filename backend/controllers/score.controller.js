import Score from "../models/Score.js";

// Salvar score
export const createScore = async (req, res) => {
  try {
    const { score, totalWords, wrongAnswers } = req.body;

    if (score == null || totalWords == null || wrongAnswers == null) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const newScore = await Score.create({
      userId: req.userId,
      score,
      totalWords,
      wrongAnswers,
    });

    res.status(201).json(newScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao salvar score." });
  }
};

// Histórico do usuário
export const getMyScores = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar histórico de scores." });
  }
};

// Ranking global
export const getRanking = async (req, res) => {
  try {
    const ranking = await Score.find()
      .sort({ score: -1, createdAt: 1 }) // evita empates mostrando quem fez primeiro
      .limit(10)
      .populate("userId", "name email");

    res.json(ranking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar ranking." });
  }
};
