const express = require('express');
const {
    getProducts, checkout, getOrders, updateStock, addProduct, updateProduct, deleteProduct,
    getCoupons, createCoupon, updateCoupon, deleteCoupon, getCouponStats,
    getCategories, createCategory, updateCategory, deleteCategory, getStoreStats
} = require('../controllers/store.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/stats', getStoreStats);

// Products
router.get('/products', getProducts);
router.post('/products', addProduct);
router.patch('/products/:id/stock', updateStock);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Orders
router.get('/orders', getOrders);
router.post('/checkout', checkout);

// Coupons
router.get('/coupons', getCoupons);
router.get('/coupons/stats', getCouponStats);
router.post('/coupons', createCoupon);
router.put('/coupons/:id', updateCoupon);
router.delete('/coupons/:id', deleteCoupon);

// Categories
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
