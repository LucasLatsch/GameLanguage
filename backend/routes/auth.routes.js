import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { jwtSecret } from "../config/auth.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "Usuário já existe" });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, passwordHash });

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "7d" });

  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid)
    return res.status(400).json({ message: "Credenciais inválidas" });

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "7d" });

  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

export default router;
