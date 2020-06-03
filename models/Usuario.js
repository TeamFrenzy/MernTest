const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
   id: Number,
   nombre: String,
   password: String
});

const Usuario = mongoose.model('usuario', UsuariosSchema);

module.exports = Usuario;