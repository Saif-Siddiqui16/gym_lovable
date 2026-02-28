const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all expenses
const getExpenses = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const role = req.user.role;

        let expenses;
        if (role === 'SUPER_ADMIN') {
            expenses = await prisma.expense.findMany({
                orderBy: { date: 'desc' }
            });
        } else {
            expenses = await prisma.expense.findMany({
                where: { tenantId },
                orderBy: { date: 'desc' }
            });
        }

        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Failed to fetch expenses' });
    }
};

// Add new expense
const createExpense = async (req, res) => {
    try {
        const { title, category, amount, date, notes, status } = req.body;
        const tenantId = req.user.tenantId;

        if (!tenantId && req.user.role !== 'SUPER_ADMIN') {
            return res.status(400).json({ message: 'Tenant ID is required for creating an expense' });
        }

        const newExpense = await prisma.expense.create({
            data: {
                tenantId: tenantId || 1, // Fallback for superadmin testing if needed
                title,
                category,
                amount: parseFloat(amount),
                date: new Date(date),
                status: status || 'Pending',
                notes: notes || null,
                addedBy: req.user.name || 'Admin',
            }
        });

        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Failed to add expense' });
    }
};

// Get all invoices with stats
const getInvoices = async (req, res) => {
    try {
        const { branchId, status: statusFilter, search } = req.query;
        const { role, tenantId: userTenantId } = req.user;

        let where = {};
        if (role !== 'SUPER_ADMIN') {
            where.tenantId = userTenantId || 1;
        } else if (branchId && branchId !== 'all') {
            where.tenantId = parseInt(branchId);
        }

        if (statusFilter && statusFilter !== 'All Status') {
            where.status = statusFilter;
        }

        if (search) {
            where.OR = [
                { invoiceNumber: { contains: search } },
                { member: { name: { contains: search } } }
            ];
        }

        const [invoices, allInvoices] = await Promise.all([
            prisma.invoice.findMany({
                where,
                include: { member: true, items: true },
                orderBy: { dueDate: 'desc' }
            }),
            prisma.invoice.findMany({
                where: role !== 'SUPER_ADMIN' ? { tenantId: userTenantId || 1 } : (branchId && branchId !== 'all' ? { tenantId: parseInt(branchId) } : {}),
                select: { id: true, amount: true, status: true, memberId: true }
            })
        ]);

        const uniqueClients = new Set(allInvoices.filter(i => i.memberId).map(i => i.memberId)).size;
        const totalPaid = allInvoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + Number(i.amount), 0);
        const totalUnpaid = allInvoices.filter(i => i.status !== 'Paid').reduce((acc, i) => acc + Number(i.amount), 0);

        res.status(200).json({
            invoices,
            stats: {
                clients: uniqueClients,
                totalInvoices: allInvoices.length,
                paid: totalPaid,
                unpaid: totalUnpaid
            }
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Failed to fetch invoices' });
    }
};

const createInvoice = async (req, res) => {
    try {
        const { memberId, dueDate, items, discount, taxRate, notes, status } = req.body;
        const tenantId = req.user.tenantId || 1;

        const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.rate) * parseInt(item.quantity)), 0);
        const disc = parseFloat(discount) || 0;
        const rate = parseFloat(taxRate) || 0;
        const taxAmount = (subtotal - disc) * (rate / 100);
        const totalAmount = subtotal - disc + taxAmount;

        const newInvoice = await prisma.invoice.create({
            data: {
                tenantId,
                invoiceNumber: `INV-${Date.now()}`,
                memberId: memberId ? parseInt(memberId) : null,
                subtotal,
                taxRate: rate,
                taxAmount,
                discount: disc,
                amount: totalAmount,
                status: status || 'Unpaid',
                dueDate: new Date(dueDate),
                notes: notes || null,
                items: {
                    create: items.map(item => ({
                        description: item.description,
                        quantity: parseInt(item.quantity),
                        rate: parseFloat(item.rate),
                        amount: parseFloat(item.rate) * parseInt(item.quantity)
                    }))
                }
            },
            include: { items: true, member: true }
        });

        res.status(201).json(newInvoice);
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: error.message });
    }
};

// Receive Payment via Cashier Mode
const receivePayment = async (req, res) => {
    try {
        const { memberId, paymentType, amount, discount, method, referenceNumber, notes } = req.body;
        const tenantId = req.user.tenantId;

        if (!tenantId && req.user.role !== 'SUPER_ADMIN') {
            return res.status(400).json({ message: 'Tenant ID is required for logging a payment' });
        }

        // Calculate final amount after discount
        const baseAmount = parseFloat(amount) || 0;
        const disc = parseFloat(discount) || 0;
        const finalAmount = Math.max(0, baseAmount - disc);

        // Create an Invoice as the transaction record
        const newInvoice = await prisma.invoice.create({
            data: {
                tenantId: tenantId || 1,
                invoiceNumber: `RCPT-${Math.floor(100000 + Math.random() * 900000)}`,
                memberId: parseInt(memberId),
                amount: finalAmount,
                paymentMode: method || 'Cash',
                status: 'Paid',
                dueDate: new Date(),
                paidDate: new Date()
            },
            include: { member: true }
        });

        res.status(201).json({
            message: 'Payment received successfully',
            receipt: newInvoice
        });
    } catch (error) {
        console.error('Error receiving payment:', error);
        res.status(500).json({ message: 'Failed to process payment' });
    }
};

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const { branchId, search, startDate, endDate, method, status } = req.query;
        const { role, tenantId: userTenantId } = req.user;

        let where = {};
        if (role !== 'SUPER_ADMIN') {
            where.tenantId = userTenantId || 1;
        } else if (branchId && branchId !== 'all') {
            where.tenantId = parseInt(branchId);
        }

        if (status && status !== 'All Status') {
            where.status = status;
        }

        if (method && method !== 'All Methods') {
            where.paymentMode = method;
        }

        if (startDate || endDate) {
            where.paidDate = {};
            if (startDate) where.paidDate.gte = new Date(startDate);
            if (endDate) where.paidDate.lte = new Date(endDate);
        }

        if (search) {
            where.OR = [
                { invoiceNumber: { contains: search } },
                { member: { name: { contains: search } } }
            ];
        }

        const invoices = await prisma.invoice.findMany({
            where,
            include: { member: true },
            orderBy: { paidDate: 'desc' }
        });

        const formatted = invoices.map(inv => ({
            id: inv.invoiceNumber,
            member: inv.member ? inv.member.name : 'Unknown',
            type: 'Membership',
            method: inv.paymentMode || 'Cash',
            amount: Number(inv.amount),
            date: inv.paidDate || inv.dueDate,
            status: inv.status
        }));

        // Stats Calculation
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayCollection = invoices
            .filter(i => i.status === 'Paid' && i.paidDate && new Date(i.paidDate) >= today)
            .reduce((acc, i) => acc + Number(i.amount), 0);

        const filteredTotal = invoices.reduce((acc, i) => acc + Number(i.amount), 0);
        const completed = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + Number(i.amount), 0);
        const pending = invoices.filter(i => i.status !== 'Paid').reduce((acc, i) => acc + Number(i.amount), 0);

        res.status(200).json({
            transactions: formatted,
            stats: {
                todayCollection,
                filteredTotal,
                completed,
                pending
            }
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;

        const expense = await prisma.expense.findUnique({
            where: { id: parseInt(id) }
        });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        if (req.user.role !== 'SUPER_ADMIN' && expense.tenantId !== tenantId) {
            return res.status(403).json({ message: 'Not authorized to delete this expense' });
        }

        await prisma.expense.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Failed to delete expense' });
    }
};

const getFinanceStats = async (req, res) => {
    try {
        const { branchId } = req.query;
        const { role, tenantId: userTenantId } = req.user;

        let where = {};
        if (role !== 'SUPER_ADMIN') {
            where.tenantId = userTenantId || 1;
        } else if (branchId && branchId !== 'all') {
            where.tenantId = parseInt(branchId);
        }

        // Fetch all data for the calculated where clause
        const [invoices, expenses, storeOrders] = await Promise.all([
            prisma.invoice.findMany({
                where,
                include: { member: true },
                orderBy: { dueDate: 'desc' }
            }),
            prisma.expense.findMany({
                where,
                orderBy: { date: 'desc' }
            }),
            prisma.storeOrder.findMany({
                where,
                include: { member: true },
                orderBy: { date: 'desc' }
            })
        ]);

        // Aggregate summary
        const incomeFromInvoices = invoices.reduce((acc, inv) => acc + Number(inv.amount), 0);
        const incomeFromPOS = storeOrders.reduce((acc, order) => acc + Number(order.total), 0);
        const totalIncome = incomeFromInvoices + incomeFromPOS;
        const totalExpenses = expenses.reduce((acc, exp) => acc + Number(exp.amount), 0);
        const netProfit = totalIncome - totalExpenses;
        const margin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

        // Group by month for chart (last 6 months)
        const monthlyData = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const now = new Date();

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const m = d.getMonth();
            const y = d.getFullYear();

            const mIncome = invoices.filter(inv => {
                const date = inv.paidDate || inv.dueDate;
                return date.getMonth() === m && date.getFullYear() === y;
            }).reduce((acc, inv) => acc + Number(inv.amount), 0) +
                storeOrders.filter(o => {
                    const date = o.date;
                    return date.getMonth() === m && date.getFullYear() === y;
                }).reduce((acc, o) => acc + Number(o.total), 0);

            const mExpenses = expenses.filter(exp => {
                const date = exp.date;
                return date.getMonth() === m && date.getFullYear() === y;
            }).reduce((acc, exp) => acc + Number(exp.amount), 0);

            monthlyData.push({
                month: monthNames[m],
                income: mIncome,
                expenses: mExpenses
            });
        }

        // Recent transactions
        const recentTransactions = [
            ...invoices.map(inv => ({
                id: inv.invoiceNumber,
                type: 'Membership',
                member: inv.member ? inv.member.name : 'Unknown',
                amount: Number(inv.amount),
                date: (inv.paidDate || inv.dueDate).toISOString().split('T')[0],
                status: inv.status,
                method: inv.paymentMode || 'Cash'
            })),
            ...storeOrders.map(o => ({
                id: `ORD-${o.id}`,
                type: 'POS Sale',
                member: o.member ? o.member.name : (o.guestName || 'Guest'),
                amount: Number(o.total),
                date: o.date.toISOString().split('T')[0],
                status: o.status,
                method: 'POS'
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

        res.json({
            summary: {
                totalIncome,
                totalExpenses,
                netProfit,
                margin: Math.round(margin),
                incomeBreakdown: {
                    memberships: incomeFromInvoices,
                    pos: incomeFromPOS
                }
            },
            monthlyData,
            transactions: recentTransactions
        });

    } catch (error) {
        console.error('Finance stats error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getExpenses,
    createExpense,
    getInvoices,
    receivePayment,
    getTransactions,
    deleteExpense,
    getFinanceStats,
    createInvoice
};
