const express = require('express');
const {
    createProduct,
    listProducts,
    searchProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);
router.get('/', listProducts);
router.get('/search', searchProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
