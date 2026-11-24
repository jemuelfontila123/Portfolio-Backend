import { Routes, Route } from "react-router-dom";

import MainLayout from "./user/components/MainLayout";
import StandaloneLayout from "./admin/components/StandaloneLayout";

import Home from "./user/pages/Home";
import About from "./user/pages/About";
import Projects from "./user/pages/Projects";
import Education from "./user/pages/Education";
import Services from "./user/pages/Services";
import Contact from "./user/pages/Contact";
import SignUp from "./admin/pages/SignUp";
import SignIn from "./admin/pages/SignIn"
import Dashboard from "./admin/pages/Dashboard"
import RequireAuth from "./admin/components/RequireAuth"

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