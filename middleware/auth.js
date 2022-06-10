// Imports

const jwt = require('jsonwebtoken');

// Vérification de l'authentification avant envoi de la requête

module.exports = (req, res, next) => {
    try {

        // Récupération de l'userId depuis le token décodé

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                message: error.message
            });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const userId = decodedToken.userId;
        
        // Récupération du role depuis le token

        const role = decodedToken.role;

        // Enregistrement de l'userId et du rôle dans l'objet de requête

        req.auth = { userId, role };        

        // Vérification si user = admin

        if (role !== 'admin') {
            return res.status(403).json({
                message : 'Requête non autorisée !'
            });
        } else {
            next();
        }

        // Vérification de la correspondance du userId du token avec l'userId de la requête

        // if (req.body.userId && req.body.userId !== userId) {
        //     throw 'User ID non valide !';
        // } else {
        //     next();
        // }
    } catch (error) {

        res.status(401).json({
            message: "Echec d'authentification",
            error: error
        });
    }
};