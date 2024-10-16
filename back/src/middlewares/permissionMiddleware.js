const permissionModel = require("../models/permission");
const roleModel = require("../models/role")

module.exports = (permisoRequerido)=>{
    return async (req, res, next) => {
        userdata = req.user;

        try{
            const role = await roleModel.findById(userdata.role).populate("permissions")
            if (!role.permissions.some(permission => permission.name === permisoRequerido)) {
                return res.status(403).json({ message: "Permiso denegado" });
            }
    
            next()
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}