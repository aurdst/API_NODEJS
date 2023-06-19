const http = require("http");
const mongoose = require('mongoose');
const router = require("./routes/blogRoutes");

const server = http.createServer((req, res) => {
    router(req, res);
})

mongoose.connect("mongodb://localhost:27017/your-database-name");

mongoose.connection.on("connected", () => {
    console.log("Connexion à la base de données établie");
  });
  
mongoose.connection.on("error", (err) => {
    console.error("Erreur de connexion à la base de données :", err);
});
  
server.listenerCount(3000, ()=> {
    console.log(`Server is running`)
});