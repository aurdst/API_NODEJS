import React, { useState } from "react";

const AddBlogForm = ({ onAddBlog }) => {
  const [title, setTitle]  = useState("");
  const [body, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //* Vérifier si les champs requis sont remplis
    if (title.trim() !== "" && body.trim() !== "") {
      const newBlog = {
        title: title,
        body : body,
        date : new Date().toISOString(),
      };

      //* Appeler la fonction de rappel pour ajouter le blog
      console.log(newBlog);
      onAddBlog(newBlog);

      //* Réinitialiser les champs du formulaire
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un nouveau blog</h2>
      <div>
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Contenu :</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddBlogForm;
