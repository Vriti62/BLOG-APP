import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published", "true");
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3001/blog/createBlog", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Blog created!");
        setTimeout(() => navigate("/blogs"), 1200);
      } else {
        setMsg(data);
      }
    } catch (err) {
      setMsg("Failed to create blog");
    }
  };

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
      <main className="flex-1 flex items-center justify-center">
        <form
          className="bg-white p-12 rounded-3xl shadow-2xl flex flex-col min-w-[350px] w-full max-w-2xl"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Create Blog</h2>
          <input
            className="mb-6 px-6 py-3 border border-blue-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            className="mb-6 px-6 py-3 border border-blue-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 min-h-[120px]"
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <input
            className="mb-6"
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow hover:scale-105 transition mb-4 text-lg"
            type="submit"
          >
            Create
          </button>
          <div className="text-blue-500 text-center mb-4 min-h-[1.2rem] text-base">{msg}</div>
        </form>
      </main>
    </div>
  );
}