const User = require('../models/User');
const bcrypt = require('bcrypt');
const Cryptojs = require("crypto-js");
const isEmailValid = require('../utils/emailValid');
const { isPasswordValid, validationMessages } = require('../utils/passwordValid');

require('dotenv').config();

// Gestion de la création d'un nouvel utilisateur

exports.signup = (req, res, next) => {
  
    // Vérification de la validité de l'email
  
    if (!isEmailValid(req.body.email)) {
        return res.status(400).json({
            message: 'adresse email non valide !'
        });
    }

    // Vérification de la validité du mot de passe

    if (!isPasswordValid(req.body.password)) {
        return res.status(400).json({
            message: validationMessages(req.body.password)
        });
    }

    // Chiffrement de l'email

    const emailEncrypted = Cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_KEY).toString();
    console.log(emailEncrypted)

    // Hachage du mot de passe avant enregistrement du nouvel utilisateur dans la BD
  
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: emailEncrypted,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      if (req.body.password !== user.password) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        userId: user._id,
				token: 'TOKEN'        
      });
    })
    .catch(error => res.status(500).json({ error }));
};