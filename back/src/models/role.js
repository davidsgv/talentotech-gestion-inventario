const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'permission' }]
})

module.exports = mongoose.model("role", roleSchema);