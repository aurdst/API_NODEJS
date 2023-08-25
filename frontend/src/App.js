import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import AddBlogForm from "./AddBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des données");
      });
  }, []);

  const handleAddBlog = (newBlog) => {
    fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    })
    .then((response) => {
     return response.json();
    })
    .then((data) => {
      console.log('test');
      console.log(data);
      setBlogs((prevBlogs) => [...prevBlogs, data]);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mon Application React</h1>
      </header>

      <main>
        <BlogList blogs={blogs} />
        <AddBlogForm onAddBlog={handleAddBlog}/>
      </main>

      <footer className="App-footer">
        <p>&copy; 2023 Mon Application React. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default App;
