import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import StandaloneLayout from "./components/StandaloneLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/admin/Dashboard"
import RequireAuth from "./components/RequireAuth"

const App = () => {
  return (
    <Routes>
      {/* Main layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Standalone layout */}
      <Route element={<StandaloneLayout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard" element={
          <RequireAuth>
          <Dashboard />
    </RequireAuth>
      }
/>
      </Route>
    </Routes>
  );
};

export default App;