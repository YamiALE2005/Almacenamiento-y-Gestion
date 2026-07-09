const mongoose = require("mongoose");

// Cache de conexión para Vercel Serverless Functions
let isConnected = false;

const conectarDB = async () => {

    if (isConnected) {
        console.log("✅ Usando conexión MongoDB existente");
        return;
    }

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log("✅ MongoDB Atlas conectado");

    } catch (error) {

        console.error("❌ Error conectando a MongoDB:", error.message);
        // NO usar process.exit(1) en Vercel — lanza el error en lugar de matar el proceso
        throw error;

    }

}

module.exports = conectarDB;