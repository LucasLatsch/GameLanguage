import List from "../models/List.js";

// criar lista
export const createList = async (req, res) => {
  try {
    const { name } = req.body;

    const list = await List.create({
      name,
      userId: req.userId,
    });

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// buscar listas do usuário
export const listLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// editar lista
export const editList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const list = await List.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name },
      { new: true },
    );

    if (!list) {
      return res.status(404).json({ message: "Lista não encontrada" });
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// deletar lista
export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;

    const list = await List.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!list) {
      return res.status(404).json({ message: "Lista não encontrada" });
    }

    res.status(200).json({ message: "Lista removida com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
