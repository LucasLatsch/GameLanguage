import ListCard from "../ListCard";

const ListsView = ({ lists, onEdit, onDelete }) => {
  if (!lists || lists.length === 0) {
    return (
      <p className="text-center text-base-content/60 mt-4">
        Nenhuma lista cadastrada
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => (
        <ListCard
          key={list._id}
          list={list}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ListsView;
