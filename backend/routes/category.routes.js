import express from "express";
import {
  createCategory,
  listCategories,
  editCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); // ✅ garante req.userId para todas as rotas abaixo

router.post("/", createCategory);
router.get("/", listCategories);
router.put("/:id", editCategory);
router.delete("/:id", deleteCategory);

export default router;
