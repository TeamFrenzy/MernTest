"use strict";
//Requires
const express = require('express')
const app = express()
const morgan = require('morgan');
const mongoose = require('mongoose');
const atRoute = require('./Controllers/AtendidosController');
const usRoute = require('./Controllers/UsuariosController');
const quRoute = require('./Controllers/QueuesController');
const turRoute = require('./Controllers/TurnosController');

const cors = require('cors');
require('dotenv').config();

const request = require('request')
const url = 'http://api.weatherstack.com/current?access_key=de0bf6647dc3086a827af076d336b126&query=Buenos Aires,Argentina'


//APP.USE
// Data parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP req log
app.use(morgan('tiny'));

//Route
app.use('/api/atendidos', atRoute);
app.use('/api/usuarios', usRoute);
app.use('/api/colas', quRoute);
app.use('/api/turnos', turRoute);

//CORS
app.use(cors());

//Request WeatherStack API
app.get('/weather-api', async (req, res) => {

    request({ url: url }, (error, response) => {
        const data = JSON.parse(response.body)
        const ciudad = data.location.name
        const temperatura = data.current.temperature
        const img = data.current.weather_icons[0]
        return res.json({
            ciudad: ciudad,
            temperatura: temperatura,
            img: img
        })
    })

});


//Server Connection
mongoose.connect(process.env.DB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});


app.listen(8080, () => console.log('Server Started'));
