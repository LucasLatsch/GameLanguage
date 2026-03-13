import Category from "../models/Category.js";

// criar categoria
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.userId;

    const category = await Category.create({ name, userId });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// listar categorias do usuário
export const listCategories = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("USER ID recebido no controller:", userId);

    const categories = await Category.find({ userId }).sort({ name: 1 });
    console.log("CATEGORIAS ENCONTRADAS:", categories);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// editar categoria
export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.userId;

    const category = await Category.findOneAndUpdate(
      { _id: id, userId },
      { name },
      { new: true },
    );

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// deletar categoria
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const category = await Category.findOneAndDelete({ _id: id, userId });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.status(200).json({ message: "Categoria removida com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
