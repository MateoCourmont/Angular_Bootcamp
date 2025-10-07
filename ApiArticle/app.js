const express = require('express');
const cors = require('cors');

// Initialiser l'application back
const app = express();

app.use('/uploads', express.static('uploads'));

const path = require('path')

// Autoriser envoie JSON
app.use(express.json());
// Désactiver le CORS 
app.use(cors());

// SWAGGER
// Init swagger middleware
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Injecter routes
const authRouter = require('./auth/auth-routes');
app.use('/auth', authRouter);

const articlesRouter = require('./articles/articles-routes');
app.use('/articles', articlesRouter);

const messagesRouter = require('./messages/messages-routes');
app.use('/messages', messagesRouter);

const moviesRouter = require('./movies/movie-routes');
app.use('/movies', moviesRouter);

// Serve static files from the assets directory
app.use('/', express.static(path.join(__dirname, '../app-articles/src')));

// Démarrer le serveur avec le port 3000
app.listen(3000, () => {
    console.log("Le serveur a démarré");
});