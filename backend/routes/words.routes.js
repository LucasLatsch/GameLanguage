import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createWord,
  editWord,
  listWords,
  deleteWord,
} from "../controllers/words.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createWord);
router.get("/", listWords);
router.put("/:id", editWord);
router.delete("/:id", deleteWord);

export default router;
