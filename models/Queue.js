const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TurnSchema = new Schema({
    id: Number,
    nombre: String
});

const QueueSchema = new Schema({
    id: Number,
    contador: Number,
    tope: Number,
    nombre: String,
    turnos: [TurnSchema]
});

const Queue = mongoose.model('queue', QueueSchema);

module.exports = Queue;