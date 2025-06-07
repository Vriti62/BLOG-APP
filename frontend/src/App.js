import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogList from "./components/BlogList";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import CreateBlog from "./components/CreateBlog";

function Navbar() {
  const location = useLocation();
  const navLinks = [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Signup" },
    { to: "/dashboard", label: "Profile" }, // Add this line
  ];
  return (
    <nav className="bg-white/90 backdrop-blur shadow-md rounded-b-xl px-6 md:px-10 py-3 mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-orange-600 hover:text-orange-700 transition">
          MyBlog
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4 md:gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md font-medium text-sm md:text-base transition-all duration-200 ${
                location.pathname === link.to
                  ? "bg-orange-500 text-white shadow"
                  : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
)}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </Router>
  );
}
