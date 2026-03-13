// src/components/WordsView.jsx
import WordCard from "../WordCard";

const WordsView = ({ words, onDelete, onEdit }) => {
  return (
    <div className="max-w-5xl mx-auto">
      {words.length === 0 && (
        <p className="text-center text-base-content/60">
          Nenhuma palavra cadastrada
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {words.map((word) => (
          <WordCard
            key={word._id}
            word={word}
            onDelete={() => onDelete(word)} // ⚡ garante que passa o objeto completo
            onEdit={() => onEdit(word)} // ⚡ passa o objeto completo para edição
          />
        ))}
      </div>
    </div>
  );
};

export default WordsView;
