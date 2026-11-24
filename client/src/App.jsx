import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import UserLayout from "./user/components/UserLayout";
import Home from "./user/pages/Home";
import About from "./user/pages/About";
import Projects from "./user/pages/Projects";
import Education from "./user/pages/Education";
import Services from "./user/pages/Services";
import Contact from "./user/pages/Contact";
import AdminLayout from "./admin/components/AdminLayout";
import RequireAdmin from "./admin/components/RequireAdmin";
import SignIn from "./admin/pages/SignIn";
import Dashboard from "./admin/pages/Dashboard";

export default function App() {
  return <Routes>
    <Route element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="projects" element={<Projects />} />
      <Route path="education" element={<Education />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="signin" element={<SignIn />} />
      <Route element={<RequireAdmin />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
    <Route path="signin" element={<Navigate to="/admin/signin" replace />} />
    <Route path="dashboard" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="signup" element={<Navigate to="/admin/signin" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
