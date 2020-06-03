const express = require('express');
const router = express.Router();
const authenticateToken = require('../lib/authenticateToken');

//Modelos
const Queue = require('../models/Queue');
const Atendidos = require('../models/Atendidos');

//Inserta nuevo turno en cola
router.post('/nuevo_turno/:id', authenticateToken, (req, res) => {
    const { nombre } = req.body;
    var counter = 0;
    Queue.findOne({ id: req.params.id }).then(function (record) {
        record.contador = record.contador + 1;
        record.save();
        counter = record.contador;
    }).then(() => {
        Queue.findOneAndUpdate({ id: req.params.id },
            {
                $push: {
                    'turnos': {
                        $each: [{ nombre: nombre, id: counter }],
                        $position: 0
                    }
                }
            },
            { new: true }, (err, result) => {
                return res.json({
                msg: 'Your data has been saved!'
            });
            })
    })
})

//Devuelve la cantidad de atendidos y de no atendidos
router.get('/lista', async (req, res) => {
    let param = req.query.pass;
    if(param != 12345678987654321)
    {
        return res.json({
            msg: 'Client calls only!'
        })
    }
    var atCount = 0;
    var noCount = 0;

    await Queue.find().stream()
        .on('data', function (record) {
            noCount = noCount + record.turnos.length;
        })
        .on('error', function (err) {
            return res.send(err);
        })
        .on('end', function () {
        });

    await Atendidos.countDocuments({}, function (err, result) {
        atCount = result;
    });

    await res.json({
        atendidos: atCount,
        noAtendidos: noCount
    })
});

module.exports = router;