import React, { useState } from "react";

const BlogList = ({ blogs }) => {
  const [sortByDate, setSortByDate] = useState(false);

  const toggleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  if (!blogs || blogs.length === 0) {
    // Si les données ne sont pas encore chargées, affichez un message de chargement ou un composant de chargement.
    return <div>Chargement en cours...</div>;
  }

  // Triez les blogs en fonction de la date si sortByDate est vrai, sinon, laissez-les dans l'ordre d'origine.
  const sortedBlogs = sortByDate
    ? [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date))
    : blogs;

  return (
    <div className="blog-list-container">
      <h2>Liste des blogs</h2>
      <button onClick={toggleSortByDate} className="sort-button">
        {sortByDate ? "Désactiver le tri par date" : "Activer le tri par date"}
      </button>
      {sortedBlogs.map((blog) => (
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
