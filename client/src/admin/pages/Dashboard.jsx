import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResourceManager from "../components/ResourceManager.jsx";
import ContactManager from "../components/ContactManager.jsx";
import { projectsApi, qualificationsApi, clearAuth } from "../api.js";

const tabs = {
  projects: {
    title: "Projects",
    render: () => <ResourceManager label="Project" api={projectsApi} />,
  },
  qualifications: {
    title: "Qualifications",
    render: () => <ResourceManager label="Qualification" api={qualificationsApi} />,
  },
  contacts: {
    title: "Contacts",
    render: () => <ContactManager />,
  },
};

export default function Dashboard() {
  const [tab, setTab] = useState("projects");
  const navigate = useNavigate();

  const signOut = () => {
    clearAuth();
    navigate("/admin/signin");
  };

  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">ADMIN</span>
          <h1>Dashboard</h1>
          <p>Manage your projects, qualifications and contacts.</p>
          <button className="btn btn-secondary" onClick={signOut}>
            Sign out
          </button>
        </div>

        <div className="nav-links admin-tabs">
          {Object.keys(tabs).map((key) => (
            <a
              key={key}
              href="#"
              className={tab === key ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setTab(key);
              }}
            >
              {tabs[key].title}
            </a>
          ))}
        </div>

        <div key={tab}>{tabs[tab].render()}</div>
      </div>
    </section>
  );
}
