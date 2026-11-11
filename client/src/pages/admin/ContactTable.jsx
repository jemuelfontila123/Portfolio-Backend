export default function ContactTable({ items, canEdit, onEdit, onDelete }) {
  if (items.length === 0) return <p>No contacts yet.</p>;

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
          {canEdit && <th></th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>
              {item.firstName} {item.lastName}
            </td>
            <td>{item.email}</td>
            <td>{item.contactNumber}</td>
            <td>
              {item.message?.length > 60
                ? `${item.message.slice(0, 60)}...`
                : item.message}
            </td>
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
