const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type: String},
    stock: { type: Number, required: true},
    category: {type: String, required: true}
}, { timestamps: true });


module.exports = mongoose.model('stockHistory', historySchema);