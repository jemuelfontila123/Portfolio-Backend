import { useEffect, useState } from "react";
import ResourceForm from "./ResourceForm.jsx";
import ResourceTable from "./ResourceTable.jsx";
import { isAdmin } from "../../api.js";

// Full CRUD for one resource. Pass in the api object from api.js.
export default function ResourceManager({ label, api }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setItems(await api.list()); // GET
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditing(null);
    setSuccess("");
    load();
  }, [api]);

  const handleSubmit = async (body) => {
    setSubmitting(true);
    setError("");
    try {
      if (editing) {
        await api.update(editing._id, body); // PATCH
        setSuccess(`${label} updated.`);
      } else {
        await api.create(body); // POST
        setSuccess(`${label} added.`);
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await api.remove(item._id); // DELETE one
      setSuccess(`${label} deleted.`);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm(`Delete ALL ${label.toLowerCase()}s? Admin only.`)) return;
    try {
      await api.removeAll(); // DELETE all (admin)
      setSuccess(`All ${label.toLowerCase()}s deleted.`);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      {isAdmin() && (
        <>
          <h2>{editing ? `Edit ${label}` : `Add ${label}`}</h2>
          <ResourceForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitting={submitting}
          />
        </>
      )}

      <div className="admin-list-header">
        <h2>All {label}s</h2>
        {isAdmin() && (
          <button className="btn btn-secondary" onClick={handleDeleteAll}>
            Delete All
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResourceTable
          items={items}
          canEdit={isAdmin()}
          onEdit={(item) => {
            setEditing(item);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
