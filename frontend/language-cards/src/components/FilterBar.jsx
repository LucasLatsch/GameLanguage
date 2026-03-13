// src/components/ui/FilterBar.jsx
import React from "react";

const FilterBar = ({
  search,
  setSearch,
  filterCategory,
  setFilterCategory,
  filterList,
  setFilterList,
  categories = [],
  lists = [],
  onClear,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
      {/* Input de busca */}
      <input
        type="text"
        placeholder="Buscar palavra..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-primary transition p-3"
      />

      {/* Select de categorias */}
      {categories.length > 0 && (
        <select
          className="select select-bordered flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-primary transition"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      )}

      {/* Select de listas */}
      {lists.length > 0 && (
        <select
          className="select select-bordered flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-primary transition"
          value={filterList}
          onChange={(e) => setFilterList(e.target.value)}
        >
          <option value="">Todas as listas</option>
          {lists.map((l) => (
            <option key={l._id} value={l._id}>
              {l.name}
            </option>
          ))}
        </select>
      )}

      {/* Botão limpar */}
      {onClear && (
        <button
          className="btn btn-primary hover:btn-primary transition flex-none"
          onClick={onClear}
        >
          Limpar
        </button>
      )}
    </div>
  );
};

export default FilterBar;
