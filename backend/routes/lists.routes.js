import express from "express";
import List from "../models/List.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// criar lista
router.post("/", async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  try {
    const list = new List({ name, userId });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// listar listas do usuário
router.get("/", async (req, res) => {
  const userId = req.user._id;
  try {
    const lists = await List.find({ userId });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
