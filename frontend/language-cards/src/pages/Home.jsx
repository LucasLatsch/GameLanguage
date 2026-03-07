import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWordsStore } from "../store/wordsStore";

const Home = () => {
  const words = useWordsStore((state) => state.words);
  const lists = useWordsStore((state) => state.lists);
  const categories = useWordsStore((state) => state.categories);
  const loading = useWordsStore((state) => state.loading);

  const fetchWords = useWordsStore((state) => state.fetchWords);
  const fetchLists = useWordsStore((state) => state.fetchLists);
  const fetchCategories = useWordsStore((state) => state.fetchCategories);

  const addWord = useWordsStore((state) => state.addWord);
  const removeWord = useWordsStore((state) => state.removeWord);

  const [term, setTerm] = useState("");
  const [translation, setTranslation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [listId, setListId] = useState("");

  useEffect(() => {
    fetchWords();
    // fetchLists();
    fetchCategories();
  }, []);

  const handleAddWord = async (e) => {
    e.preventDefault();

    if (!term || !translation) return;

    await addWord(term, translation, categoryId, listId || null);

    setTerm("");
    setTranslation("");
    setCategoryId("");
    setListId("");
  };

  const handleRemoveWord = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja remover esta palavra?"
    );

    if (!confirmDelete) return;

    await removeWord(id);
  };

  return (
    <div className="min-h-[100dvh] p-4 sm:p-6 md:p-12 flex flex-col items-center bg-base-200">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mb-8 pt-20"
      >
        <div className="card bg-base-100 shadow-lg p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Gerencie suas palavras
          </h2>

          <form
            onSubmit={handleAddWord}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            <input
              type="text"
              placeholder="Palavra"
              className="input input-bordered"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Tradução"
              className="input input-bordered"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              required
            />

            {/* Categoria */}
            <select
              className="select select-bordered"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Categoria</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Lista (opcional) */}
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

            <button
              type="submit"
              className="btn btn-primary"
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
              className="card bg-base-100 shadow-md p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{word.term}</span>

                <button
                  onClick={() => handleRemoveWord(word._id)}
                  className="btn btn-error btn-xs"
                >
                  X
                </button>
              </div>

              <span className="text-base-content/70">{word.translation}</span>

              {/* Categoria */}
              {word.categoryId && (
                <span className="badge badge-primary badge-sm w-fit">
                  {word.categoryId.name}
                </span>
              )}

              {/* Lista */}
              {word.listId && (
                <span className="badge badge-outline badge-sm w-fit">
                  {word.listId.name}
                </span>
              )}
            </div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;
