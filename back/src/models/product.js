const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: {type: String},
    stock: { type: Number, required: true},
    stock_alert: { type: Number, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true }
});


module.exports = mongoose.model('product', productSchema);