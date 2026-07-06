require("dotenv").config();

const express = require("express");
const conectarDB = require("./src/config/database");
const expedienteRoutes = require("./src/routes/expedienteRoutes");

conectarDB();

const app = express();
const port = process.env.PORT || 5100;

app.use(express.json());

app.use("/api", expedienteRoutes);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});