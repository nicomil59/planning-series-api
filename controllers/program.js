// Imports

const Program = require('../models/Program');

// ********** Création d'un programme **********

exports.createProgram = (req, res, next) => {

    console.log("req.body", req.body);
    
    // Création objet program

    const program = new Program({
        ...req.body
    });

    // Enregistrement du programme créée dans la BD

    program.save()
        .then(() => res.status(201).json({
            message: 'Nouveau programme enregistré !'
        }))
        .catch(error => res.status(400).json({
            message: error.message
        }));
};

// ********** Récupération de tous les programmes **********

exports.getAllPrograms = (req, res, next) => {
    Program.find()
        .then(programs => {
            res.status(200).json(programs);
        })
        .catch(error => {
            res.status(400).json({
                message: error.message
            });
        });
};