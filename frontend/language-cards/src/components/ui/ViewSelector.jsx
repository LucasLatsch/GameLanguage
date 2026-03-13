const ViewSelector = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex gap-2 mb-6">
      <button
        className={`btn ${viewMode === "words" ? "btn-primary" : "btn-outline"}`}
        onClick={() => setViewMode("words")}
      >
        Palavras
      </button>

      <button
        className={`btn ${viewMode === "lists" ? "btn-primary" : "btn-outline"}`}
        onClick={() => setViewMode("lists")}
      >
        Listas
      </button>

      <button
        className={`btn ${viewMode === "categories" ? "btn-primary" : "btn-outline"}`}
        onClick={() => setViewMode("categories")}
      >
        Categorias
      </button>
    </div>
  );
};

export default ViewSelector;
