const mongoose = require("mongoose");

const expedienteSchema = new mongoose.Schema({
    nombreArchivo: {
        type: String,
        required: true
    },
    nombreOriginal: {
        type: String,
        required: true
    },
    tipoMime: {
        type: String,
        required: true
    },
    tamaño: {
        type: Number,
        required: true
    },
    rutaArchivo: {
        type: String,
        required: true
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fechaCarga: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Expediente", expedienteSchema);