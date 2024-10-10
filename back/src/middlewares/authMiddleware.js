//aca se debe crear un middleware que verifique:
//si el token pasado por auth es valido: así como en la aplicacion del profe
//pero ademas también debe revisar en la base de datos si el usuario tiene el permiso
//para hacer la operación del endpoint
// es decir si va a actualizar un prodcuto que tenga el permiso "update_product"
//se debe guardar el role y el email en la request (req.user = {email: "", role: ""})