import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createList,
  listLists,
  deleteList,
  editList,
} from "../controllers/lists.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createList);
router.get("/", listLists);
router.delete("/:id", deleteList);
router.put("/:id", editList);

export default router;
