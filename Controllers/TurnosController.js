const express = require('express');
const router = express.Router();
const authenticateToken = require('../lib/authenticateToken');

//Modelos
const Queue = require('../models/Queue');
const Atendidos = require('../models/Atendidos');

//Inserta nuevo turno en cola
router.post('/nuevo_turno/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
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
                res.json(result);
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
            console.log(record.nombre);
            console.log(record.turnos.length);
            noCount = noCount + record.turnos.length;
            console.log("NoAtendidos:" + noCount);
        })
        .on('error', function (err) {
        })
        .on('end', function () {
        });
    console.log("AtendidosF:" + atCount);
    console.log("NoAtendidosF:" + noCount);

    await Atendidos.countDocuments({}, function (err, result) {
        console.log('Atendidos: ' + result)
        atCount = result;
    });

    await res.json({
        atendidos: atCount,
        noAtendidos: noCount
    })
});

module.exports = router;