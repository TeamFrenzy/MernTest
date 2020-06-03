const express = require('express');
const router = express.Router();
const authenticateToken = require('../lib/authenticateToken');

//Modelos
const Queue = require('../models/Queue');
const Atendidos = require('../models/Atendidos');

//Guarda en Atendidos y elimina el primer valor de una cola
router.get('/atender_proximo/:id', authenticateToken, (req, res) => {

    Queue.findOne({ id: req.params.id }).then(function (record) {
        record.tope = record.tope + 1;
        var temp = record.turnos.pop();
        var pat = new Atendidos({
            id: temp.id,
            nombre: temp.nombre
        });
        pat.save();
        record.save();
        return res.json(temp);
    });
});

module.exports = router;