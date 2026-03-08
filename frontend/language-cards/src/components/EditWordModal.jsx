import { useState, useEffect } from "react";

const EditWordModal = ({
  open,
  onClose,
  word,
  onUpdate,
  categories,
  lists,
}) => {
  const [term, setTerm] = useState("");
  const [translation, setTranslation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [listId, setListId] = useState("");

  useEffect(() => {
    if (word) {
      setTerm(word.term);
      setTranslation(word.translation);

      setCategoryId(word.categoryId?._id || word.categoryId || "");
      setListId(word.listId?._id || word.listId || "");
    }
  }, [word]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(word._id, {
      term,
      translation,
      categoryId,
      listId: listId || null,
    });
  };

  if (!open || !word) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Editar Palavra</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Palavra */}
          <input
            type="text"
            className="input input-bordered"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />

          {/* Tradução */}
          <input
            type="text"
            className="input input-bordered"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          />

          {/* Categoria */}
          <select
            className="select select-bordered"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Categoria</option>

            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Lista */}
          <select
            className="select select-bordered"
            value={listId}
            onChange={(e) => setListId(e.target.value)}
          >
            <option value="">Sem lista</option>

            {lists?.map((list) => (
              <option key={list._id} value={list._id}>
                {list.name}
              </option>
            ))}
          </select>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWordModal;
