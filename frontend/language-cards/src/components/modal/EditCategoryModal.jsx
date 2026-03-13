// src/components/modal/EditCategoryModal.jsx
import { useEffect, useState } from "react";
import { useCategoriesStore } from "../../store/categoriesStore";

const EditCategoryModal = ({ open, onClose, category }) => {
  const { addCategory, updateCategory } = useCategoriesStore();
  const loading = useCategoriesStore((state) => state.loading);

  const [name, setName] = useState("");
  const isEditing = !!category;

  useEffect(() => {
    if (!open) return;

    if (category) setName(category.name || "");
    else setName("");
  }, [category, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isEditing) await updateCategory(category._id, name);
    else await addCategory(name);

    setName("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="card bg-base-100 p-6 w-full max-w-sm">
        <h3 className="font-bold text-lg mb-4">
          {isEditing ? "Editar Categoria" : "Nova Categoria"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="input input-bordered"
            placeholder="Nome da categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {isEditing ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
