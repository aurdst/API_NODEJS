const http = require("http");
const mongoose = require("mongoose"); // Importez le module mongoose
const router = require("./routes/blogRoutes");

//useNewUrlParser: Cette option indique à Mongoose d'utiliser le nouvel analyseur d'URL pour l'analyse des chaînes de connexion de MongoDB. Elle est nécessaire lorsque vous utilisez une version récente de MongoDB ou une version de Mongoose supérieure à 5. Pour assurer une connexion correcte, vous devez spécifier cette option avec la valeur true.

//useUnifiedTopology: Cette option active le nouveau moteur de surveillance du serveur dans MongoDB. Elle est recommandée pour utiliser les fonctionnalités les plus récentes de MongoDB et assurer une stabilité et une performance améliorées. Vous devez spécifier cette option avec la valeur true pour utiliser la topologie unifiée.

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = http.createServer((req, res) => {
    router.handleRequest(req, res); // Appeler la fonction handleRequest du router
});

mongoose.connection.on("connected", () => {
  console.log("Connexion à la base de données établie");
});

mongoose.connection.on("error", (err) => {
  console.error("Erreur de connexion à la base de données :", err);
});

server.listen(3000, () => {
  console.log("Le serveur est en cours d'exécution");
});
