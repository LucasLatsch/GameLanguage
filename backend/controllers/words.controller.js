import Word from "../models/Word.js";
import List from "../models/List.js";
import Category from "../models/Category.js";

// criar palavra
export const createWord = async (req, res) => {
  try {
    const { term, translation, categoryId, listId } = req.body;
    const userId = req.userId;

    if (!term || !translation || !categoryId || !listId) {
      return res.status(400).json({
        message: "Termo, tradução, lista e categoria são obrigatórios.",
      });
    }

    // validar lista e categoria
    const list = await List.findOne({ _id: listId, userId });
    if (!list) return res.status(400).json({ message: "Lista inválida." });

    const category = await Category.findOne({ _id: categoryId, userId });
    if (!category)
      return res.status(400).json({ message: "Categoria inválida." });

    const word = await Word.create({
      term,
      translation,
      listId,
      categoryId,
      userId,
    });

    const populatedWord = await Word.findById(word._id)
      .populate("categoryId", "name")
      .populate("listId", "name");

    res.status(201).json(populatedWord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// listar palavras
export const listWords = async (req, res) => {
  try {
    // 1️⃣ Log do userId recebido
    console.log("USER ID recebida no controller:", req.userId);

    if (!req.userId) {
      console.warn(
        "Nenhum userId recebido! O token pode estar faltando ou inválido.",
      );
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    // 2️⃣ Buscar palavras do usuário
    const words = await Word.find({ userId: req.userId })
      .populate("categoryId", "name")
      .populate("listId", "name")
      .sort({ createdAt: -1 });

    // 3️⃣ Log do resultado
    console.log("Palavras encontradas:", words.length);
    words.forEach((w, i) => {
      console.log(
        `${i + 1}. Termo: ${w.term}, Lista: ${w.listId?.name}, Categoria: ${w.categoryId?.name}`,
      );
    });

    res.status(200).json(words);
  } catch (error) {
    console.error("Erro ao listar palavras:", error);
    res.status(500).json({ message: error.message });
  }
};

// editar palavra
export const editWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { term, translation, categoryId, listId } = req.body;

    // construir objeto de atualização apenas com campos definidos
    const updateData = {};
    if (term !== undefined) updateData.term = term;
    if (translation !== undefined) updateData.translation = translation;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (listId !== undefined) updateData.listId = listId;

    const word = await Word.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updateData,
      { new: true },
    )
      .populate("categoryId", "name")
      .populate("listId", "name");

    if (!word)
      return res.status(404).json({ message: "Palavra não encontrada" });

    res.status(200).json(word);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// deletar palavra
export const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;

    const word = await Word.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!word) {
      return res.status(404).json({ message: "Palavra não encontrada" });
    }

    res.status(200).json({ message: "Palavra removida com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
