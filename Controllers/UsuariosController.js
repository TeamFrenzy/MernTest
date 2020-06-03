const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticateToken = require('../lib/authenticateToken');

//Modelo
const Usuario = require('../models/Usuario');

//Crea un nuevo usuario. La id debe ser asignada arbitrariamente.
router.post('/nuevo_usuario', authenticateToken, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)

        var pat = new Usuario({
            id: req.body.id,
            nombre: req.body.nombre,
            password: hashedPassword
        })

        pat.save();

        return res.json({
            msg: 'Message in a bottle'
        })
    } catch {
        res.status(500).send()
    }
});

//Eliminar usuario. Toma un ID como parametro.
router.delete('/eliminar_usuario/:id', authenticateToken, async (req, res) => {

    Usuario.findOneAndDelete({ id: req.params.id }, function (err, docs) {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(docs);
        }
    })
});

//Modificar usuario
router.patch('/modificar_usuario/:id', authenticateToken, async (req, res) => {
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)

    Usuario.findOneAndUpdate({ id: req.params.id }, { nombre: req.body.nombre, password: hashedPassword }, function (err, docs) {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(docs);
        }
    })
});

//Leer usuario
router.get('/leer_usuario/:id', authenticateToken, async (req, res) => {

    Usuario.findOne({ id: req.params.id }, function (err, docs) {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(docs);
        }
    })
});

//Leer usuarios
router.get('/leer_usuarios', authenticateToken, async (req, res) => {

    Usuario.find({ }, function (err, docs) {
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