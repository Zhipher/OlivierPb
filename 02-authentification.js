const express = require("express");
const route = require("./02-route"); // fichier en charge des routes express
const connexion = require('./02-connexion')
require("./02-bdd")(); // connexion à la base de données 

const app = express();

app.use("/", route); 
app.use("/", connexion); 

const PORT = process.env.PORT || 5600;

app.listen(PORT , console.log(`serveur express démarré sur le port ${PORT}`));
