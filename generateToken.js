const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Generar un token aleatorio y seguro
const nuevoToken = "AppToken_" + crypto.randomBytes(24).toString("hex");

const envPath = path.join(__dirname, ".env");

try {
    let envContent = "";
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, "utf8");
    }

    // Verificar si APP_TOKEN ya existe en el archivo
    if (envContent.includes("APP_TOKEN=")) {
        // Reemplazar la línea existente
        envContent = envContent.replace(/APP_TOKEN=.*/g, `APP_TOKEN=${nuevoToken}`);
    } else {
        // Si no existe, agregarlo al final (asegurando una nueva línea)
        const lineEnd = envContent.endsWith("\n") || envContent.endsWith("\r\n") ? "" : "\n";
        envContent += `${lineEnd}APP_TOKEN=${nuevoToken}`;
    }

    fs.writeFileSync(envPath, envContent.trim() + "\n", "utf8");

    console.log("=========================================================================");
    console.log("✅ ¡Token generado y guardado en .env!");
    console.log("=========================================================================");
    console.log(`🔑 APP_TOKEN:`);
    console.log(`${nuevoToken}`);
    console.log("=========================================================================");
    console.log("Copia este token y ponlo en tu cabecera 'APP_TOKEN' en Thunder Client.");
    console.log("=========================================================================");

} catch (error) {
    console.error("❌ Error al generar o guardar el token:", error.message);
}
