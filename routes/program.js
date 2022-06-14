// Imports

const express = require('express');
const auth = require('../middleware/auth');
const programCtrl = require('../controllers/program');

// Création du routeur Express

const router = express.Router();

// Création des routes

router.get('/', programCtrl.getAllPrograms);
router.get('/:id', programCtrl.getProgram);
router.post('/', auth, programCtrl.createProgram);
// router.put('/:id', auth, programCtrl.updateProgram);
router.delete('/:id', auth, programCtrl.deleteProgram);

// Exports

module.exports = router;