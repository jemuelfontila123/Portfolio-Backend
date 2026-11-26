export default function ResourceTable({ items, canEdit, onEdit, onDelete }) {
  if (items.length === 0) return <p>Nothing here yet.</p>;

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Completed</th>
          <th>Description</th>
          {canEdit && <th></th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td>
              {item.completionDate
                ? new Date(item.completionDate).toLocaleDateString()
                : "-"}
            </td>
            <td>{item.description}</td>
            {canEdit && (
              <td className="admin-actions">
                <button className="btn btn-secondary" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-secondary" onClick={() => onDelete(item)}>
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
