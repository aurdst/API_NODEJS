import React from "react";

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Liste des blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
