const verificarToken = (req, res, next) => {

    // Obtener el token de los headers comunes, customizados o de Authorization
    const tokenHeader = req.header("app_token") ||
                        req.header("app-token") ||
                        req.header("APP_TOKEN") ||
                        req.header("token") ||
                        req.header("Authorization");

    if (!tokenHeader) {
        return res.status(401).json({
            mensaje: "Token no proporcionado"
        });
    }

    // Si viene de Authorization con el prefijo "Bearer ", se lo quitamos
    const token = tokenHeader.startsWith("Bearer ")
        ? tokenHeader.replace("Bearer ", "")
        : tokenHeader;

    // Validación del token estático (genérico) de la aplicación
    if (token !== process.env.APP_TOKEN) {
        return res.status(401).json({
            mensaje: "Token inválido"
        });
    }

    next();

};

module.exports = verificarToken;