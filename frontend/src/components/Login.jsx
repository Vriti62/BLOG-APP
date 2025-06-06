import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMsg(data);
      }
    } catch (err) {
      setMsg("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200">
      <form
        className="bg-white p-8 rounded-xl shadow-xl flex flex-col min-w-[320px] w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Login</h2>
        <input
          className="mb-4 px-4 py-2 border border-orange-300 rounded focus:outline-none focus:border-orange-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          className="mb-4 px-4 py-2 border border-orange-300 rounded focus:outline-none focus:border-orange-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        <button
          className="bg-gradient-to-r from-pink-400 to-orange-400 text-white py-2 rounded font-semibold shadow hover:scale-105 transition mb-2"
          type="submit"
        >
          Login
        </button>
        <div className="text-orange-500 text-center mb-2 min-h-[1.2rem]">{msg}</div>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link className="text-orange-500 font-bold hover:underline" to="/register">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}