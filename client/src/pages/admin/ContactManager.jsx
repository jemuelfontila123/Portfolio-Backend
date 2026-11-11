import { useEffect, useState } from "react";
import ContactForm from "./ContactForm.jsx";
import ContactTable from "./ContactTable.jsx";
import { contactsApi, isAdmin } from "../../api.js";

// Full CRUD for contacts. Non-admins only see the list.
export default function ContactManager() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setItems(await contactsApi.list()); // GET
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (body) => {
    setSubmitting(true);
    setError("");
    try {
      if (editing) {
        await contactsApi.update(editing._id, body); // PATCH
        setSuccess("Contact updated.");
      } else {
        await contactsApi.create(body); // POST
        setSuccess("Contact added.");
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
    if (!window.confirm(`Delete ${item.firstName} ${item.lastName}?`)) return;
    try {
      await contactsApi.remove(item._id); // DELETE one
      setSuccess("Contact deleted.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Delete ALL contacts? Admin only.")) return;
    try {
      await contactsApi.removeAll(); // DELETE all (admin)
      setSuccess("All contacts deleted.");
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
          <h2>{editing ? "Edit Contact" : "Add Contact"}</h2>
          <ContactForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitting={submitting}
          />
        </>
      )}

      <div className="admin-list-header">
        <h2>All Contacts</h2>
        {isAdmin() && (
          <button className="btn btn-secondary" onClick={handleDeleteAll}>
            Delete All
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ContactTable
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
