import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import wordRoutes from "./routes/words.routes.js";
import scoreRoutes from "./routes/score.routes.js";

dotenv.config();

const app = express();

// ✅ PORT vindo do ambiente (Render) ou fallback local
const PORT = process.env.PORT || 3333;

// Middlewares
app.use(
  cors({
    origin: "*", // depois podemos restringir
  })
);
app.use(express.json());

// Banco de dados
connectDB();

// Health check (ótimo para deploy)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API funcionando corretamente 🚀",
  });
});

// Rotas
app.use("/auth", authRoutes);
app.use("/words", wordRoutes);
app.use("/scores", scoreRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
