import { useState } from "react";
import { useWordsStore } from "../store/wordsStore";

export const useWordsManager = () => {
  const { addWord, removeWord, updateWord } = useWordsStore();

  const [selectedWord, setSelectedWord] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleOpenEditModal = (word) => {
    setSelectedWord({ ...word });
    setEditModalOpen(true);
  };

  const handleRemoveWord = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja remover esta palavra?",
    );

    if (!confirmDelete) return;

    await removeWord(id);
  };

  const handleUpdateWord = async (id, updatedData) => {
    await updateWord(id, updatedData);

    setEditModalOpen(false);
    setSelectedWord(null);
  };

  return {
    selectedWord,
    setSelectedWord, // 👈 FALTAVA ISSO
    editModalOpen,
    setEditModalOpen,
    handleOpenEditModal,
    handleRemoveWord,
    handleUpdateWord,
  };
};
