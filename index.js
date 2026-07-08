require("dotenv").config();

const express = require("express");
const conectarDB = require("./src/config/database");
const expedienteRoutes = require("./src/routes/expedienteRoutes");

const app = express();

// Conectar a MongoDB
conectarDB();

app.use(express.json());

// Rutas
app.use("/api", expedienteRoutes);

// Exportar la aplicación para Vercel
module.exports = app;