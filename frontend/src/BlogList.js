import React from "react";

const BlogList = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    // Si les données ne sont pas encore chargées, affichez un message de chargement ou un composant de chargement.
    return <div>Chargement en cours...</div>;
  }

  const sortBlogs = blogs.slice().sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="blog-list-container">
      <h2>Liste des blogs</h2>
      {sortBlogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <h3 className="blog-title">{blog.title ? blog.title : "Titre non défini"}</h3>
          <p className="blog-body">{blog.body ? blog.body : "Contenu non défini"}</p>
          <p className="blog-date">
            {blog.date ? `Date de création : ${new Date(blog.date).toLocaleString()}` : "Date non définie"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;