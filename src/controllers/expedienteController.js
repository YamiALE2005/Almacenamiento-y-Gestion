const Expediente = require("../model/expediente");

// Crear un expediente
const crearExpediente = async (req, res) => {
    try {

        const expediente = new Expediente(req.body);

        await expediente.save();

        res.status(201).json({
            mensaje: "Expediente creado correctamente",
            expediente
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear expediente",
            error: error.message
        });

    }
};

// Obtener todos los expedientes
const obtenerExpedientes = async (req, res) => {
    try {

        const expedientes = await Expediente.find().populate("usuarioId");

        res.status(200).json(expedientes);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener expedientes",
            error: error.message
        });

    }
};

// Obtener un expediente por ID
const obtenerExpedientePorId = async (req, res) => {
    try {

        const expediente = await Expediente.findById(req.params.id)
            .populate("usuarioId");

        if (!expediente) {
            return res.status(404).json({
                mensaje: "Expediente no encontrado"
            });
        }

        res.status(200).json(expediente);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al buscar expediente",
            error: error.message
        });

    }
};

// Actualizar expediente
const actualizarExpediente = async (req, res) => {
    try {

        const expediente = await Expediente.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!expediente) {
            return res.status(404).json({
                mensaje: "Expediente no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Expediente actualizado correctamente",
            expediente
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al actualizar expediente",
            error: error.message
        });

    }
};

// Eliminar expediente
const eliminarExpediente = async (req, res) => {
    try {

        const expediente = await Expediente.findByIdAndDelete(req.params.id);

        if (!expediente) {
            return res.status(404).json({
                mensaje: "Expediente no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Expediente eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar expediente",
            error: error.message
        });

    }
};

module.exports = {
    crearExpediente,
    obtenerExpedientes,
    obtenerExpedientePorId,
    actualizarExpediente,
    eliminarExpediente
};