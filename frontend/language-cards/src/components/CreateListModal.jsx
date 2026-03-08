import { useState } from "react";
import { useListsStore } from "../store/listsStore";

const CreateListModal = ({ open, onClose }) => {
  const createList = useListsStore((state) => state.createList);
  const loading = useListsStore((state) => state.loading);

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return;

    await createList(name);

    setName("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="card bg-base-100 p-6 w-full max-w-sm">
        <h3 className="font-bold text-lg mb-4">Nova Lista</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="input input-bordered"
            placeholder="Nome da lista"
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

export default CreateListModal;
