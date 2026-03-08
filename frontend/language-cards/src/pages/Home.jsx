import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWordsStore } from "../store/wordsStore";
import { useCategoriesStore } from "../store/categoriesStore";
import { useListsStore } from "../store/listsStore";
import WordCard from "../components/WordCard";
import CreateCategoryModal from "../components/CreateCategoryModal";
import CreateListModal from "../components/CreateListModal";

const Home = () => {
  const words = useWordsStore((state) => state.words);
  const lists = useListsStore((state) => state.lists);
  const categories = useCategoriesStore((state) => state.categories);
  const loading = useWordsStore((state) => state.loading);

  const fetchWords = useWordsStore((state) => state.fetchWords);
  const fetchLists = useListsStore((state) => state.fetchLists);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  const addWord = useWordsStore((state) => state.addWord);
  const removeWord = useWordsStore((state) => state.removeWord);

  const [term, setTerm] = useState("");
  const [translation, setTranslation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [listId, setListId] = useState("");

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterList, setFilterList] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchWords();
    fetchLists();
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

  const filteredWords = words.filter((word) => {
    const category = word.categoryId?._id || word.categoryId;
    const list = word.listId?._id || word.listId;

    const matchCategory = !filterCategory || category === filterCategory;
    const matchList = !filterList || list === filterList;

    const matchSearch =
      word.term.toLowerCase().includes(search.toLowerCase()) ||
      word.translation.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchList && matchSearch;
  });

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
              onChange={(e) => {
                if (e.target.value === "new") {
                  setCategoryModalOpen(true);
                  return;
                }

                setCategoryId(e.target.value);
              }}
            >
              <option value="">Categoria</option>

              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}

              <option value="new">+ Nova categoria</option>
            </select>

            {/* Lista (opcional) */}
            <select
              className="select select-bordered"
              value={listId}
              onChange={(e) => {
                if (e.target.value === "new") {
                  setListModalOpen(true);
                  return;
                }

                setListId(e.target.value);
              }}
            >
              <option value="">Sem lista</option>

              {lists?.map((list) => (
                <option key={list._id} value={list._id}>
                  {list.name}
                </option>
              ))}

              <option value="new">+ Nova lista</option>
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

      {/* Filtros */}
      <div className="w-full max-w-5xl mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar palavra..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filtro categoria */}
        <select
          className="select select-bordered"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas categorias</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Filtro lista */}
        <select
          className="select select-bordered"
          value={filterList}
          onChange={(e) => setFilterList(e.target.value)}
        >
          <option value="">Todas listas</option>

          {lists.map((list) => (
            <option key={list._id} value={list._id}>
              {list.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-outline"
          onClick={() => {
            setSearch("");
            setFilterCategory("");
            setFilterList("");
          }}
        >
          Limpar filtros
        </button>
      </div>

      {/* Lista de palavras */}
      <motion.div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredWords?.map((word) => (
            <WordCard key={word._id} word={word} onDelete={handleRemoveWord} />
          ))}
        </AnimatePresence>
      </motion.div>
      <CreateCategoryModal
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
      <CreateListModal
        open={listModalOpen}
        onClose={() => setListModalOpen(false)}
      />
    </div>
  );
};

export default Home;
