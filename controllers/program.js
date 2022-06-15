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

// ********** Récupération d'un programme **********

exports.getProgram = (req, res, next) => {

    // Récupération dans la BD du programme qui correspond à l'id dans la requête

    Program.findOne({
            _id: req.params.id
        })
        .then(program => {
            res.status(200).json(program);
        })
        .catch(error => {
            res.status(404).json({
                message: error.message
            });
        });
};

// ********** Suppression d'un programme **********

exports.deleteProgram = (req, res, next) => {

    // Récupération dans la BD du programme qui correspond à l'id dans la requête

    Program.findOne({
            _id: req.params.id
        })
        .then(program => {

            // Vérification de l'existence du programme

            if (!program) {

                return res.status(404).json({
                    message: "Programme inexistant !"
                });
            }

            // Suppression du programme de la BD

            Program.deleteOne({
                    _id: req.params.id
                })
                .then(() => res.status(200).json({
                    message: 'Programme supprimé !'
                }))
                .catch(error => res.status(400).json({
                    message: error.message
                }))

        })
        .catch(error => {
            res.status(400).json({
                message: error.message
            });
        })
};

// ********** Modification d'un programme **********

exports.updateProgram = (req, res, next) => {

    console.log("req.body", req.body);
    
    // Récupération dans la BD du programme qui correspond à l'id dans la requête

    Program.findOne({
            _id: req.params.id
        })
        .then(program => {

            // Vérification de l'existence de la sauce

            if (!program) {
                return res.status(404).json({
                    message: "Programme inexistant !"
                });
            }

            // Mise à jour du programme

            Program.updateOne({
                    _id: req.params.id
                }, {
                    ...req.body,
                    _id: req.params.id
                })
                .then(() => res.status(200).json({
                    message: 'Programme modifié !'
                }))
                .catch(error => res.status(400).json({
                    message: error.message
                }));

        })
        .catch(error => {
            res.status(404).json({
                message: error.message
            });
        });


};