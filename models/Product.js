const mongoose = require("mongoose");
const productSchema = ({
        name: String,
        price: Number,
        category: String,
        stock: Number
});

module.exports = mongoose.model("Product", productSchema);