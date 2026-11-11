import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResourceManager from "./ResourceManager.jsx";
import { projectsApi, qualificationsApi, clearAuth } from "../../api.js";

const tabs = {
  projects: { label: "Project", api: projectsApi },
  qualifications: { label: "Qualification", api: qualificationsApi },
};

export default function Dashboard() {
  const [tab, setTab] = useState("projects");
  const navigate = useNavigate();
  const { label, api } = tabs[tab];

  const signOut = () => {
    clearAuth();
    navigate("/signin");
  };

  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">ADMIN</span>
          <h1>Dashboard</h1>
          <p>Manage your projects and qualifications.</p>
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
              {tabs[key].label}s
            </a>
          ))}
        </div>

        <ResourceManager label={label} api={api} />
      </div>
    </section>
  );
}
