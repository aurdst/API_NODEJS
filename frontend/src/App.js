import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
    .then((response) => response.json())
    .then((data) => {
      setBlogs(data);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la récupération des données")
    })
  }, []);

  return (
    <div className="App">
      <h1>Mon Application React</h1>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default App;
