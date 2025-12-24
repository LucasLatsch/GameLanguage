import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWordsStore } from "../store/wordsStore";

const Home = () => {
  const words = useWordsStore((state) => state.words);
  const loading = useWordsStore((state) => state.loading);
  const fetchWords = useWordsStore((state) => state.fetchWords);
  const addWord = useWordsStore((state) => state.addWord);
  const removeWord = useWordsStore((state) => state.removeWord);

  const [term, setTerm] = useState("");
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    fetchWords();
  }, []);

  const handleAddWord = async (e) => {
    e.preventDefault();
    if (!term || !translation) return;
    await addWord(term, translation);
    setTerm("");
    setTranslation("");
  };

  const handleRemoveWord = async (id) => {
    await removeWord(id); // sem mexer com token aqui
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-12 flex flex-col items-center bg-base-200">
      {/* Form de adicionar palavras */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mb-8 pt-20"
      >
        <div className="card bg-base-100 shadow-lg p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Gerencie suas palavras
          </h2>
          <form
            onSubmit={handleAddWord}
            className="flex flex-col sm:flex-row gap-4 py-4"
          >
            <input
              type="text"
              placeholder="Palavra"
              className="input input-bordered flex-1 p-2"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Tradução"
              className="input input-bordered flex-1 p-2"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Adicionar"
              )}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Lista de palavras */}
      <motion.div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {words.map((word) => (
            <div
              key={word._id}
              className="card bg-base-100 shadow-md p-4 flex flex-row items-center justify-between gap-4"
            >
              <span className="font-semibold">{word.term}</span>

              <span className="text-base-content/70">{word.translation}</span>

              <button
                onClick={() => handleRemoveWord(word._id)}
                className="btn btn-error btn-sm"
              >
                X
              </button>
            </div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;
