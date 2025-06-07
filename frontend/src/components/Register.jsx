import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Registered! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setMsg(data);
      }
    } catch (err) {
      setMsg("Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500">
      <form
        className="bg-white p-14 rounded-3xl shadow-2xl flex flex-col min-w-[350px] w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Sign Up</h2>
        <input
          className="mb-6 px-6 py-3 border border-blue-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
          placeholder="Username"
          value={username}
          onChange={e=>setUsername(e.target.value)}
          required
        />
        <input
          className="mb-6 px-6 py-3 border border-blue-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          className="mb-6 px-6 py-3 border border-blue-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow hover:scale-105 transition mb-4 text-lg"
          type="submit"
        >
          Sign Up
        </button>
        <div className="text-blue-500 text-center mb-4 min-h-[1.2rem] text-base">{msg}</div>
        <div className="text-center text-base">
          Already have an account?{" "}
          <Link className="text-blue-600 font-bold hover:underline" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}