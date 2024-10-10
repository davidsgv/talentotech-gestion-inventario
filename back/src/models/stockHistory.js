const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    name: { type: String, required: true },
    description: {type: String},
    stock: { type: Number, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true}
}, { timestamps: true });


module.exports = mongoose.model('stockHistory', historySchema);