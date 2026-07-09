const express = require("express");
const conectarDB = require("./src/config/database");
const expedienteRoutes = require("./src/routes/expedienteRoutes");

const app = express();

app.use(express.json());

// Middleware para conectar a MongoDB antes de cada request (patrón Vercel)
app.use(async (req, res, next) => {
    try {
        await conectarDB();
        next();
    } catch (error) {
        res.status(500).json({
            mensaje: "Error de conexión a base de datos",
            error: error.message
        });
    }
});

// Rutas
app.use("/api", expedienteRoutes);

// Exportar la aplicación para Vercel
module.exports = app;