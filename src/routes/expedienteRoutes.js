const express = require("express");
const router = express.Router();

const verificarToken = require("../middlewares/authMiddleware");

const {
    crearExpediente,
    obtenerExpedientes,
    obtenerExpedientePorId,
    actualizarExpediente,
    eliminarExpediente
} = require("../controllers/expedienteController");

router.post("/expedientes", verificarToken, crearExpediente);

router.get("/expedientes", verificarToken, obtenerExpedientes);

router.get("/expedientes/:id", verificarToken, obtenerExpedientePorId);

router.put("/expedientes/:id", verificarToken, actualizarExpediente);

router.delete("/expedientes/:id", verificarToken, eliminarExpediente);

module.exports = router;