const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Middleware pour activer CORS
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Utiliser le routeur pour gérer les routes des blogs
app.use(blogRoutes);

const server = http.createServer(app);

mongoose.connection.on('connected', () => {
  console.log('Connexion à la base de données établie');
});

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion à la base de données :', err);
});

server.listen(3000, () => {
  console.log('Le serveur est en cours d\'exécution');
});
