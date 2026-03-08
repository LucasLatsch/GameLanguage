import express from "express";
import List from "../models/List.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// criar lista
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const list = await List.create({
      name,
      userId: req.userId,
    });

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listar listas
router.get("/", async (req, res) => {
  const lists = await List.find({ userId: req.userId });

  res.json(lists);
});

// deletar lista
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const list = await List.findOneAndDelete({ _id: id, userId });
    if (!list) {
      return res.status(404).json({ message: "Lista não encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
