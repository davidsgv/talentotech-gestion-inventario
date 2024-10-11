//aca se debe crear un middleware que verifique:
//si el token pasado por auth es valido: así como en la aplicacion del profe
//pero ademas también debe revisar en la base de datos si el usuario tiene el permiso
//para hacer la operación del endpoint
// es decir si va a actualizar un prodcuto que tenga el permiso "update_product"
//se debe guardar el role y el email en la request (req.user = {email: "", role: ""})
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

exports.verificarPermiso = (permisoRequerido) => {
    return async (req, res, next) => {
        try {
         
            const token = req.header("Authorization").replace("Bearer ", "");
            const decoded = jwt.verify(token, "secretKey");
            const usuario = await Usuario.findById(decoded.id);

            // Guardar email y rol en la request (req.user)
            req.user = {
                email: usuario.username,  //  'username'  email 
                role: usuario.role
            };

           
            if (!usuario.permissions.includes(permisoRequerido)) {
                return res.status(403).json({ message: "Permiso denegado" });
            }

            
            next();
        } catch (error) {
            res.status(401).json({ message: "Autenticación inválida" });
        }
    };
};
