import CategoryCard from "../CategoryCard";

const CategoriesView = ({ categories, onEdit, onDelete }) => {
  if (!categories || categories.length === 0) {
    return (
      <p className="text-center text-base-content/60 mt-4">
        Nenhuma categoria cadastrada
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoriesView;
