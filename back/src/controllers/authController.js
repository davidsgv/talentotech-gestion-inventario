const Usuario = require("../models/user");
const jwt = require("jsonwebtoken");
const RoleModel = require("../models/role")

exports.registrarUsuario = async (req, res) => {
    const { email, password, role } = req.body;  // Cambié 'permission' a 'permissions'
    try {
        const usuarioExiste = await Usuario.exists({ email });
        if (usuarioExiste) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const nuevoUsuario = new Usuario({
            email,
            password,
            role: await getRole(role)
        });

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        const token = jwt.sign({ id: nuevoUsuario._id }, "secretKey", { expiresIn: "1h" });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecta" });
        }

        const isMatch = await usuario.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña o usuario incorrecto" });
        }

        
        const token = jwt.sign({ id: usuario._id }, "secretKey", { expiresIn: "3h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getRole(role){
    let findRole = await RoleModel.findOne({name: role})
    return findRole._id;
}