const User = require('../models/User');

exports.signup = (req, res, next) => {
  
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    console.log(user)

    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    
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