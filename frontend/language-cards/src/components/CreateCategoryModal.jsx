import { useState } from "react";
import { useCategoriesStore } from "../store/categoriesStore";

const CreateCategoryModal = ({ open, onClose }) => {
  const addCategory = useCategoriesStore((state) => state.addCategory);
  const loading = useCategoriesStore((state) => state.loading);

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return;

    await addCategory(name);

    setName("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="card bg-base-100 p-6 w-full max-w-sm">
        <h3 className="font-bold text-lg mb-4">Nova Categoria</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="input input-bordered"
            placeholder="Nome da categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancelar
            </button>

            <button className="btn btn-primary" disabled={loading}>
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
