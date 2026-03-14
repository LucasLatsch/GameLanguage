import User from "../models/User.js";
import List from "../models/List.js";
import Category from "../models/Category.js";
import Word from "../models/Word.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/auth.js";

// Função auxiliar para criar categorias padrão
const createDefaultCategories = async (userId) => {
  const defaultCategories = [
    "Objetos",
    "Adjetivos",
    "Animais",
    "Alimentos",
    "Verbos",
  ];

  const categories = [];

  for (const name of defaultCategories) {
    try {
      const cat = await Category.create({ name, userId });
      categories.push(cat);
    } catch (err) {
      if (err.code === 11000) {
        // Categoria já existe para esse usuário, pegar do DB
        const existing = await Category.findOne({ name, userId });
        categories.push(existing);
      } else {
        throw err;
      }
    }
  }

  return categories;
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    // Cria usuário
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    // Cria lista padrão
    const list = await List.create({
      name: "Novas palavras",
      userId: user._id,
    });

    // Cria categorias padrão do usuário
    const defaultCategories = [
      "Objetos",
      "Adjetivos",
      "Animais",
      "Alimentos",
      "Verbos",
    ];
    const categories = [];

    for (const catName of defaultCategories) {
      const cat = await Category.create({ name: catName, userId: user._id });
      categories.push(cat);
    }

    // Cria palavras de exemplo
    const sampleWords = [
      { term: "Apple", translation: "Maçã", categoryName: "Alimentos" },
      { term: "Dog", translation: "Cachorro", categoryName: "Animais" },
      { term: "Happy", translation: "Feliz", categoryName: "Adjetivos" },
      { term: "Book", translation: "Livro", categoryName: "Objetos" },
      { term: "Run", translation: "Correr", categoryName: "Verbos" },
    ];

    for (const w of sampleWords) {
      const category = categories.find((c) => c.name === w.categoryName);
      if (!category) continue; // evita null

      await Word.create({
        term: w.term,
        translation: w.translation,
        listId: list._id,
        categoryId: category._id,
        userId: user._id,
      });
    }

    // Cria token JWT
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "7d",
    });

    // Retorna usuário e token
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
