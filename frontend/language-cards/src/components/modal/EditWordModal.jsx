import { useEffect, useState } from "react";
import { useWordsStore } from "../../store/wordsStore";

const EditWordModal = ({
  open,
  onClose,
  word,
  onUpdate,
  categories,
  lists,
}) => {
  const { addWord } = useWordsStore();

  const [term, setTerm] = useState("");
  const [translation, setTranslation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [listId, setListId] = useState("");

  const isEditing = !!word;

  useEffect(() => {
    if (!open) return;

    if (word) {
      setTerm(word.term || "");
      setTranslation(word.translation || "");
      setCategoryId(word.categoryId?._id || word.categoryId || "");
      setListId(word.listId?._id || word.listId || "");
    } else {
      setTerm("");
      setTranslation("");
      setCategoryId("");
      setListId("");
    }
  }, [word, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!term.trim() || !translation.trim()) return;

    if (isEditing) {
      await onUpdate(word._id, {
        term,
        translation,
        categoryId,
        listId,
      });
    } else {
      await addWord(term, translation, categoryId, listId || null);
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {isEditing ? "Editar Palavra" : "Nova Palavra"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input input-bordered w-full"
            placeholder="Palavra"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />

          <input
            className="input input-bordered w-full"
            placeholder="Tradução"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          />

          <select
            className="select select-bordered w-full"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            value={listId}
            onChange={(e) => setListId(e.target.value)}
          >
            <option value="">Sem lista</option>
            {lists.map((list) => (
              <option key={list._id} value={list._id}>
                {list.name}
              </option>
            ))}
          </select>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Salvar" : "Adicionar"}
            </button>

            <button type="button" className="btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWordModal;
