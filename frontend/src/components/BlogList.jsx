import React, { useEffect, useState } from "react";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/blog", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBlogs(data);
        else setMsg("No blogs found or not authenticated.");
      })
      .catch(() => setMsg("Error fetching blogs"));
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      {msg && <div>{msg}</div>}
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <b>{blog.title}</b>
            <div>{blog.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}