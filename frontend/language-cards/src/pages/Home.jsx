// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useWordsStore } from "../store/wordsStore";
import { useCategoriesStore } from "../store/categoriesStore";
import { useListsStore } from "../store/listsStore";
import { useAuthStore } from "../store/authStore";

import { useWordsManager } from "../hooks/useWordsManager";
import { useFilters } from "../hooks/useFilters";
import { useViewMode } from "../hooks/useViewMode";

import ViewSelector from "../components/ui/ViewSelector";
import FilterBar from "../components/FilterBar";
import WordsView from "../components/views/WordsView";
import CategoriesView from "../components/views/CategoriesView";
import ListsView from "../components/views/ListsView";

import EditWordModal from "../components/modal/EditWordModal";
import EditListModal from "../components/modal/EditListModal";
import EditCategoryModal from "../components/modal/EditCategoryModal";
import ConfirmModal from "../components/modal/ConfirmModal";

const Home = () => {
  const { token } = useAuthStore();
  const { words, fetchWords, removeWord, updateWord } = useWordsStore();
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    removeCategory,
  } = useCategoriesStore();
  const { lists, fetchLists, createList, updateList, deleteList } =
    useListsStore();

  const {
    selectedWord,
    setSelectedWord,
    editModalOpen,
    setEditModalOpen,
    handleOpenEditModal,
  } = useWordsManager();

  const {
    search,
    setSearch,
    filterCategory,
    setFilterCategory,
    filterList,
    setFilterList,
    clearFilters,
    filteredWords,
  } = useFilters(words);

  const { viewMode, setViewMode } = useViewMode();

  // Modais de criação/edição
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);

  const [editList, setEditList] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  // Modal de confirmação
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteType, setDeleteType] = useState(""); // 'word' | 'list' | 'category'

  // Abrir modal de delete
  const handleDeleteItem = (item, type) => {
    if (!item) return;
    setItemToDelete(item);
    setDeleteType(type);
    setDeleteModalOpen(true);
  };

  // Confirmar exclusão
  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setDeleteLoading(true);

    try {
      if (deleteType === "word") {
        await removeWord(itemToDelete._id);
      } else if (deleteType === "list") {
        await deleteList(itemToDelete._id);
      } else if (deleteType === "category") {
        await removeCategory(itemToDelete._id);
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }

    setDeleteLoading(false);
    setDeleteModalOpen(false);
    setItemToDelete(null);
    setDeleteType("");
  };

  // Abrir modal de edição
  const handleEditList = (list) => setEditList(list);
  const handleEditCategory = (category) => setEditCategory(category);

  // Criar novo item
  const handleAddAction = () => {
    if (viewMode === "words") {
      setSelectedWord(null);
      setEditModalOpen(true);
      return;
    }

    if (viewMode === "lists") {
      setEditList(null);
      setListModalOpen(true);
      return;
    }

    if (viewMode === "categories") {
      setEditCategory(null);
      setCategoryModalOpen(true);
    }
  };

  const handleCloseWordModal = () => {
    setEditModalOpen(false);
    setSelectedWord(null);
  };

  const handleCloseListModal = () => {
    setListModalOpen(false);
    setEditList(null);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
    setEditCategory(null);
  };

  useEffect(() => {
    if (!token) return;

    fetchWords();
    fetchLists();
    fetchCategories();
  }, [token, fetchWords, fetchLists, fetchCategories]);

  return (
    <div className="min-h-[100dvh] p-6 pt-24 bg-base-200">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Gerencie suas palavras
      </h1>

      <div className="md:flex justify-between items-center mb-6">
        <ViewSelector viewMode={viewMode} setViewMode={setViewMode} />

        <button
          className="btn btn-primary mt-2 md:mt-0"
          onClick={handleAddAction}
        >
          {viewMode === "words" && "Nova Palavra"}
          {viewMode === "lists" && "Nova Lista"}
          {viewMode === "categories" && "Nova Categoria"}
        </button>
      </div>

      {/* Barra de filtros */}
      {viewMode === "words" && (
        <FilterBar
          search={search}
          setSearch={setSearch}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterList={filterList}
          setFilterList={setFilterList}
          categories={categories}
          lists={lists}
          onClear={clearFilters}
        />
      )}

      {/* Views */}
      {viewMode === "words" && (
        <WordsView
          words={filteredWords}
          onEdit={handleOpenEditModal}
          onDelete={(word) => handleDeleteItem(word, "word")}
        />
      )}

      {viewMode === "lists" && (
        <ListsView
          lists={lists}
          onEdit={handleEditList}
          onDelete={(list) => handleDeleteItem(list, "list")}
          categories={categories}
        />
      )}

      {viewMode === "categories" && (
        <CategoriesView
          categories={categories}
          onEdit={handleEditCategory}
          onDelete={(cat) => handleDeleteItem(cat, "category")}
        />
      )}

      {/* MODAIS */}
      <EditWordModal
        open={editModalOpen}
        onClose={handleCloseWordModal}
        word={selectedWord || null}
        onUpdate={updateWord}
        categories={categories}
        lists={lists}
      />

      <EditListModal
        open={listModalOpen || !!editList}
        onClose={handleCloseListModal}
        list={editList}
      />

      <EditCategoryModal
        open={categoryModalOpen || !!editCategory}
        onClose={handleCloseCategoryModal}
        category={editCategory}
      />

      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={`Deletar ${
          deleteType === "word"
            ? "Palavra"
            : deleteType === "list"
              ? "Lista"
              : "Categoria"
        }`}
        message={`Tem certeza que deseja deletar "${
          itemToDelete?.term || itemToDelete?.name || "este item"
        }"?`}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Home;
