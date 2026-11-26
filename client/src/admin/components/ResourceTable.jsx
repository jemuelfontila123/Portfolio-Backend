
const projectColumns = [
  ["title", "Title"],
  ["completionDate", "Completed"],
  ["image", "Image"],
  ["role", "Role"],
  ["outcome", "Outcome"],
  ["description", "Description"],
];

const qualificationColumns = [
  ["title", "Program"],
  ["completionDate", "Completed"],
  ["year", "Year"],
  ["school", "School"],
  ["credential", "Credential"],
  ["description", "Description"],
];

function formatValue(item, field) {
  const value = item[field];

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (field === "completionDate") {
    return new Date(value).toLocaleDateString(
      undefined,
      { timeZone: "UTC" }
    );
  }

  return value;
}

export default function ResourceTable({
  label,
  items,
  canEdit,
  onEdit,
  onDelete,
}) {
  if (items.length === 0) {
    return <p>Nothing here yet.</p>;
  }

  const columns =
    label === "Project"
      ? projectColumns
      : qualificationColumns;

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map(([field, caption]) => (
              <th key={field}>
                {caption}
              </th>
            ))}

            {canEdit && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              {columns.map(([field]) => (
                <td key={field}>
                  {formatValue(item, field)}
                </td>
              ))}

              {canEdit && (
                <td className="admin-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
