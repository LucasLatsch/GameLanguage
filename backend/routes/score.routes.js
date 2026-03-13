import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createScore,
  getMyScores,
  getRanking,
} from "../controllers/score.controller.js";

const router = express.Router();

// Rotas que precisam de autenticação
router.post("/", authMiddleware, createScore);
router.get("/me", authMiddleware, getMyScores);

// Ranking pode ser público ou protegido, depende do seu caso
router.get("/ranking", getRanking);

export default router;
