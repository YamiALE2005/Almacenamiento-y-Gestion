const express = require("express");
const helmet = require("helmet");
const conectarDB = require("./src/config/database");
const expedienteRoutes = require("./src/routes/expedienteRoutes");

const app = express();
app.use(helmet());

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

// Iniciar servidor local si se ejecuta directamente
if (require.main === module) {
    require("dotenv").config();
    const PORT = process.env.PORT || 5100;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor local corriendo en http://localhost:${PORT}`);
        console.log(`📁 Rutas disponibles:`);
        console.log(`   - GET  http://localhost:${PORT}/api/expedientes`);
        console.log(`   - POST http://localhost:${PORT}/api/expedientes`);
    });
}
