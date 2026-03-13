import { useState, useMemo } from "react";

export const useFilters = (words) => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterList, setFilterList] = useState("");
  const [search, setSearch] = useState("");

  const clearFilters = () => {
    setSearch("");
    setFilterCategory("");
    setFilterList("");
  };

  const filteredWords = useMemo(() => {
    return words.filter((word) => {
      const category = word.categoryId?._id || word.categoryId;
      const list = word.listId?._id || word.listId;

      const matchCategory = !filterCategory || category === filterCategory;
      const matchList = !filterList || list === filterList;

      const matchSearch =
        word.term.toLowerCase().includes(search.toLowerCase()) ||
        word.translation.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchList && matchSearch;
    });
  }, [words, filterCategory, filterList, search]);

  return {
    search,
    setSearch,
    filterCategory,
    setFilterCategory,
    filterList,
    setFilterList,
    clearFilters,
    filteredWords,
  };
};
