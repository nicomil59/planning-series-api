const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Je teste le serveur express !!' });
});

module.exports = app;