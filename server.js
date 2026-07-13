const app = require("./index");
require("dotenv").config();

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(`🚀 Servidor local corriendo en http://localhost:${PORT}`);
    console.log(`📁 Rutas disponibles:`);
    console.log(`   - GET  http://localhost:${PORT}/api/expedientes`);
    console.log(`   - POST http://localhost:${PORT}/api/expedientes`);
});
