const express = require('express');
const router = express.Router();
const authenticateToken = require('../lib/authenticateToken');

//Modelo
const Queue = require('../models/Queue');

//Crea nueva cola. Toma un { nombre } como parametro
router.post('/crear_cola/:id', authenticateToken, (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;

    var pat = new Queue({
        id: id,
        contador: 0,
        tope: 1,
        nombre: nombre,
    });

    pat.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Unexpected internal server errors' });
            return;
        }
        return res.json({
            msg: 'Your data has been saved!'
        });
    });
})

//Eliminar cola
router.delete('/eliminar_cola/:id', authenticateToken, (req, res) => {

    Queue.findOneAndDelete({ id: req.params.id }, function (err, docs) {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(docs);
        }
    })
})

//Modificar cola. Modifica el nombre de la cola. Toma un { nombre } como parametro
router.patch('/modificar_cola/:id', authenticateToken, (req, res) => {
    Queue.findOneAndUpdate({ id: req.params.id }, { nombre: req.body.nombre }, function (err, docs) {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(docs);
        }
    })
})

//Lee datos de ID especifico.
router.get('/leer_cola/:id', authenticateToken, (req, res) => {
    Queue.findOne({ id: req.params.id }, function (err, docs) {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(docs);
        }
    })
})

//Leer colas
//Nota: Estoy usando una contraseña hard-codeada en el cliente para proteger las rutas de fetching. Esta practica es unicamente a modo de ilustracion y considerando que el usuario jamas tendria acceso al codigo fuente del programa.
router.get('/lista', async (req, res) => {
    let param = req.query.pass;
    if(param != 12345678987654321)
    {
        return res.json({
            msg: 'Client calls only!'
        })
    }

    Queue.find({ }, function (err, docs) {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(docs);
        }
    })
});

module.exports = router;