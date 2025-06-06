import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [msg, setMsg] = useState("");
  const [actionError, setActionError] = useState({}); // { [blogId]: errorMsg }
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/blog/getBlogs", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        console.log(data); // <-- Add this line
        if (Array.isArray(data)) setBlogs(data.slice(0, 3));
        else setMsg("No blogs found or not authenticated.");
      })
      .catch(() => setMsg("Error fetching blogs"));
  }, []);

  // Handler for Like/Comment when not logged in
  const handleAuthAction = blogId => {
    setActionError(prev => ({ ...prev, [blogId]: "Signup / Login first please" }));
    setTimeout(() => setActionError(prev => ({ ...prev, [blogId]: "" })), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white pb-10">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-700 to-blue-400 shadow-lg">
        <h1 className="text-5xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight">
          Welcome to <span className="text-blue-200">Blogify</span>!
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          Discover, share, and discuss amazing stories.
        </p>
      </div>

      {/* Featured Blogs */}
      <div className="w-full mt-12 px-0">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-8 tracking-tight">
          Featured Blogs
        </h2>
        {msg && (
          <div className="text-center text-blue-600 mb-4">{msg}</div>
        )}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
          {blogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg flex-1 flex flex-col border border-blue-100 hover:shadow-2xl transition min-h-[500px]"
            >
              <img
                src={blog.fileUrl}
                alt={blog.title}
                className="rounded-t-2xl h-80 w-full object-cover"
                onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x200?text=No+Image"; }}
              />
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-blue-700">{blog.title}</h3>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                    {blog.category || "General"}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 flex-1">
                  {blog.content.length > 120
                    ? blog.content.slice(0, 120) + "..."
                    : blog.content}
                </p>
                <Link
                  className="inline-flex items-center self-start bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition text-sm mt-2"
                  to={`/blog/${blog._id}`}
                >
                  Read More
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                {/* Like and Comment icons */}
                <div className="relative flex flex-col items-start mt-6">
                  {actionError[blog._id] && (
                    <div className="absolute -top-10 left-0 z-10 bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-lg shadow text-xs font-semibold animate-fade-in">
                      {actionError[blog._id]}
                    </div>
                  )}
                  <div className="flex items-center gap-6">
                    <button
                      className="flex items-center text-blue-500 hover:text-pink-500 transition"
                      onClick={() => handleAuthAction(blog._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="text-sm font-semibold">Like</span>
                    </button>
                    <button
                      className="flex items-center text-blue-500 hover:text-blue-700 transition"
                      onClick={() => handleAuthAction(blog._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10 0V6a4 4 0 00-8 0v2m8 0H7" />
                      </svg>
                      <span className="text-sm font-semibold">Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Signup Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition text-lg"
          >
            Signup to Explore!
          </button>
        </div>
      </div>
    </div>
  );
}
