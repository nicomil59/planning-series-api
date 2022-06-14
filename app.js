const express = require('express');
const helmet = require("helmet");
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const programRoutes = require('./routes/program');

require('dotenv').config();

const app = express();

// Connexion à la BD MongoDB avec Mongoose

mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}${process.env.CLUSTER_DB}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware de Express qui analyse requêtes JSON entrantes et met données analysés dans req.body

app.use(express.json());

// Middleware - ajout de headers de contrôle d'accès pour tous les objets de réponse

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware - Helmet

app.use(helmet());

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Je teste le serveur express !!' });
// });

// Enregistrements des routes

app.use('/api/auth', userRoutes);
app.use('/api/programs', programRoutes);

// Export de l'app

module.exports = app;