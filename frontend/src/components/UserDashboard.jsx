import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/blog/getBlogs", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else setMsg("No blogs found or not authenticated.");
      })
      .catch(() => setMsg("Error fetching blogs"));
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 shadow-xl rounded-r-3xl p-8 flex flex-col gap-6">
        <div className="text-2xl font-extrabold text-blue-700 mb-8">MyBlog</div>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 font-semibold text-left hover:bg-blue-100 rounded-lg px-3 py-2 transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/create-blog")}
            className="text-blue-600 font-semibold text-left hover:bg-blue-100 rounded-lg px-3 py-2 transition"
          >
            Create Blog
          </button>
          <button
            onClick={() => navigate("/blogs")}
            className="text-blue-600 font-semibold text-left hover:bg-blue-100 rounded-lg px-3 py-2 transition"
          >
            Explore Blogs
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            Welcome, User!
          </h1>
          <p className="text-blue-500">What would you like to do today?</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-4">All Blogs</h2>
          {msg && <div className="text-blue-600 mb-4">{msg}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition"
              >
                <img
                  src={blog.fileUrl}
                  alt={blog.title}
                  className="rounded-xl mb-4 h-40 w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
                <h3 className="text-lg font-bold text-blue-700 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {blog.content.length > 100
                    ? blog.content.slice(0, 100) + "..."
                    : blog.content}
                </p>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 self-start">
                  {blog.category || "General"}
                </span>
                <button
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="self-start bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition text-sm"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Right Panel (optional) */}
      <aside className="hidden xl:flex flex-col w-72 bg-blue-200/60 rounded-l-3xl p-8 ml-4">
        <div className="font-bold text-blue-700 mb-4">Top Creators</div>
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-400"></div>
            <span className="font-semibold text-blue-700">Anna Johnson</span>
          </li>
          {/* Add more users */}
        </ul>
      </aside>
    </div>
  );
}