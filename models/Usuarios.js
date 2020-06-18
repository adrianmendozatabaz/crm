//importaciones
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//diseño del modelo
const usuariosSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: 'Agrega tu nombre'
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Usuarios', usuariosSchema);