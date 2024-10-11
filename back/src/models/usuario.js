const mongose = require("mongoose")
const bcrypt = require("bcryptjs")

const Schema = mongose.Schema

const usuarioSchema = new Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    
    permissions: {  // Lista de permisos específicos
        type: [String],  // Arreglo de permisos (por ejemplo: ['update_product', 'delete_product'])
        default: []
    }
})
usuarioSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        return next()
    }try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }catch(error){
        next(error)
    }
})

usuarioSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
const Usuario = mongose.model("Usuario", usuarioSchema)

module.exports = Usuario