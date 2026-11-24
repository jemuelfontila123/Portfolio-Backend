import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return <><header className="navbar"><Link className="logo" to="/admin">Portfolio Admin</Link><nav className="nav-links"><Link to="/">View portfolio</Link></nav></header><main><Outlet /></main></>;
}
