import { motion } from "framer-motion";
import { Trash2, Pencil, List } from "lucide-react";
import { useWordsStore } from "../store/wordsStore";

const ListCard = ({ list, onEdit, onDelete }) => {
  const words = useWordsStore((state) => state.words);
  const wordsCount = words.filter((w) => w.listId === list._id).length;

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
      <h3 className="text-2xl font-bold tracking-wide flex items-center gap-2">
        <List size={20} />
        {list.name}
      </h3>

      {/* Footer actions */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="btn btn-ghost btn-sm gap-2"
          onClick={() => onEdit(list)}
        >
          <Pencil size={16} />
          Editar
        </button>
        <button
          className="btn btn-ghost btn-sm gap-2 text-error hover:scale-110 transition"
          onClick={() => onDelete(list)}
        >
          <Trash2 size={18} />
          Apagar
        </button>
      </div>
    </motion.div>
  );
};

export default ListCard;
