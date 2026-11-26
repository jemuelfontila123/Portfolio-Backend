
import { useEffect, useState } from "react";
import ResourceForm from "./ResourceForm.jsx";
import ResourceTable from "./ResourceTable.jsx";
import { isAdmin } from "../api.js";

// Full CRUD for projects and qualifications.
export default function ResourceManager({ label, api }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Retrieve all records.
  const load = async () => {
    setLoading(true);

    try {
      setItems(await api.list());
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

  // Create or update a resource.
  const handleSubmit = async (body) => {
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      if (editing) {
        await api.update(editing._id, body);
        setSuccess(`${label} updated.`);
      } else {
        await api.create(body);
        setSuccess(`${label} added.`);
      }

      setEditing(null);
      await load();

      return true;
    } catch (err) {
      setError(err.message);

      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Delete an individual resource.
  const handleDelete = async (item) => {
    if (!isAdmin()) return;

    if (!window.confirm(`Delete "${item.title}"?`)) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await api.remove(item._id);

      if (editing?._id === item._id) {
        setEditing(null);
      }

      setSuccess(`${label} deleted.`);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete all records. Admin only.
  const handleDeleteAll = async () => {
    if (!isAdmin()) return;

    if (
      !window.confirm(
        `Delete ALL ${label.toLowerCase()}s? This action cannot be undone.`
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await api.removeAll();

      setEditing(null);

      setSuccess(
        `All ${label.toLowerCase()}s deleted.`
      );

      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="form-success" role="status">
          {success}
        </p>
      )}

      {isAdmin() && (
        <>
          <h2>
            {editing ? `Edit ${label}` : `Add ${label}`}
          </h2>

          <ResourceForm
            label={label}
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
          <button
            className="btn btn-secondary"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResourceTable
          label={label}
          items={items}
          canEdit={isAdmin()}
          onEdit={(item) => {
            setEditing(item);
            setError("");
            setSuccess("");

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
