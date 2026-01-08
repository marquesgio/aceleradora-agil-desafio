const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true,
        },
        categoria: {
            type: String,
            required: true,
            trim: true,
        },
        quantidade: {
            type: Number,
            required: true,
            min: 0,
        },
        preco: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
