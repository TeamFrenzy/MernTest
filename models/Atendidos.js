const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AtendidosSchema = new Schema({
   id: Number,
   nombre: String
});

const Atendidos = mongoose.model('atendidos', AtendidosSchema);

module.exports = Atendidos;