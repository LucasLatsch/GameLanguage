import { motion } from "framer-motion";
import { Trash2, Pencil, Tag, List } from "lucide-react";
import { useCategoriesStore } from "../store/categoriesStore";
import { useListsStore } from "../store/listsStore";

const WordCard = ({ word, onDelete, onEdit }) => {
  const categoryId = word.categoryId?._id || word.categoryId;
  const listId = word.listId?._id || word.listId;

  const category = useCategoriesStore((state) => state.categories).find(
    (c) => c._id === categoryId,
  );
  const list = useListsStore((state) => state.lists).find(
    (l) => l._id === listId,
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="card bg-base-100 shadow-md hover:shadow-xl p-5 relative border border-base-300"
    >
      {/* Word */}
      <h3 className="text-2xl font-bold tracking-wide">{word.term}</h3>

      {/* Translation */}
      <p className="text-lg text-base-content/70 mt-1">{word.translation}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {category && (
          <span className="badge badge-outline gap-1">
            <Tag size={14} />
            {category.name}
          </span>
        )}

        {list && (
          <span className="badge badge-ghost gap-1">
            <List size={14} />
            {list.name}
          </span>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex justify-end mt-4">
        <button
          className="btn btn-ghost btn-sm gap-2"
          onClick={() => onEdit(word)}
        >
          <Pencil size={16} />
          Editar
        </button>
        <button
          className="btn btn-ghost btn-sm gap-2 text-error hover:scale-110 transition"
          onClick={() => onDelete(word._id)}
        >
          <Trash2 size={18} />
          Apagar
        </button>
      </div>
    </motion.div>
  );
};

export default WordCard;
