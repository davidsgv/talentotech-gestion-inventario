const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: {type: String},
    stock: { type: Number, required: true},
}, { timestamps: true });


module.exports = mongoose.model('stockHistory', historySchema);