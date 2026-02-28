const express = require('express');
const { getExpenses, createExpense, getInvoices, receivePayment, getTransactions, deleteExpense, getFinanceStats, createInvoice } = require('../controllers/finance.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('SUPER_ADMIN', 'BRANCH_ADMIN', 'MANAGER'));

router.get('/stats', getFinanceStats);
router.get('/expenses', getExpenses);
router.post('/expenses', createExpense);
router.delete('/expenses/:id', deleteExpense);
router.get('/invoices', getInvoices);
router.post('/invoices', createInvoice);
router.post('/cashier', receivePayment);
router.get('/transactions', getTransactions);

module.exports = router;
