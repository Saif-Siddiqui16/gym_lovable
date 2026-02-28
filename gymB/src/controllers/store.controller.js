const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

exports.getProducts = async (req, res) => {
    try {
        const { category, search, allStatus } = req.query;
        let where = {};

        if (req.user && req.user.role !== 'SUPER_ADMIN') {
            where.tenantId = req.user.tenantId;
        }

        if (allStatus !== 'true') {
            where.status = { not: 'Inactive' };
        }

        if (category && category !== 'All') {
            where.category = category;
        }

        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        const products = await prisma.storeProduct.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStoreStats = async (req, res) => {
    try {
        const tenantId = req.user.tenantId || 1;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [products, orders, categoriesCount] = await Promise.all([
            prisma.storeProduct.findMany({ where: { tenantId } }),
            prisma.storeOrder.findMany({
                where: { tenantId },
                include: { items: { include: { product: true } }, member: true },
                orderBy: { date: 'desc' }
            }),
            prisma.storeCategory.count({ where: { tenantId } })
        ]);

        const totalProducts = products.length;
        const lowStockCount = products.filter(p => p.stock < 10).length;
        const stockValue = products.reduce((acc, p) => acc + (parseFloat(p.price) * p.stock), 0);

        const todayOrders = orders.filter(o => new Date(o.createdAt) >= today);
        const todayPos = todayOrders.reduce((acc, o) => acc + parseFloat(o.total || 0), 0);
        const totalRevenue = orders.reduce((acc, o) => acc + parseFloat(o.total || 0), 0);
        const totalSales = orders.length;

        // Simple profit calculation: (Price - Cost) * Quantity for all sales
        let totalProfit = 0;
        orders.forEach(order => {
            order.items.forEach(item => {
                const cost = parseFloat(item.product?.costPrice || 0);
                const price = parseFloat(item.priceAtBuy || 0);
                totalProfit += (price - cost) * item.quantity;
            });
        });

        res.json({
            stats: {
                totalSales,
                productsCount: totalProducts,
                todayPos,
                totalRevenue,
                profit: totalProfit,
                stockValue,
                lowStockCount,
                categoriesCount,
                pendingOrders: orders.filter(o => o.status === 'Pending').length,
                todaySalesCount: todayOrders.length
            },
            recentTransactions: orders.slice(0, 5).map(o => ({
                id: o.id.toString(),
                amount: o.total,
                status: o.status,
                itemsCount: o.itemsCount,
                date: o.date || o.createdAt
            })),
            orders: orders.slice(0, 10).map(o => ({
                ...o,
                totalAmount: o.total // convenience for frontend
            }))
        });
    } catch (error) {
        console.error("Store stats error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, sku, category, price, stock, description, image, originalPrice } = req.body;
        const tenantId = req.user.tenantId || 1;

        // calculate status based on stock
        let status = 'Active';
        if (parseInt(stock) === 0) status = 'Inactive';
        else if (parseInt(stock) <= 10) status = 'Low Stock';

        // upload image if it's base64
        let imageUrl = image;
        if (image && image.startsWith('data:image')) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                folder: 'gym/store/products'
            });
            imageUrl = uploadRes.secure_url;
        }

        const product = await prisma.storeProduct.create({
            data: {
                tenantId,
                name,
                sku,
                category,
                price: parseFloat(price),
                stock: parseInt(stock),
                status,
                description,
                image: imageUrl,
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        const status = parseInt(stock) === 0 ? 'Inactive' : (parseInt(stock) <= 10 ? 'Low Stock' : 'Active');

        const updatedProduct = await prisma.storeProduct.update({
            where: { id: parseInt(id) },
            data: {
                stock: parseInt(stock),
                status
            }
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error("Update stock error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, sku, category, price, stock, description, image, originalPrice, status } = req.body;

        // Auto calculate status if stock updated and status is not explicitly set to something else
        let calculatedStatus = status || 'Active';
        if (parseInt(stock) === 0) calculatedStatus = 'Inactive';
        else if (parseInt(stock) <= 10 && calculatedStatus !== 'Inactive') calculatedStatus = 'Low Stock';

        // upload image if it's base64
        let imageUrl = image;
        if (image && image.startsWith('data:image')) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                folder: 'gym/store/products'
            });
            imageUrl = uploadRes.secure_url;
        }

        const product = await prisma.storeProduct.update({
            where: { id: parseInt(id) },
            data: {
                name,
                sku,
                category,
                price: parseFloat(price),
                stock: parseInt(stock),
                status: calculatedStatus,
                description,
                image: imageUrl,
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
            }
        });

        res.json(product);
    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.storeProduct.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.checkout = async (req, res) => {
    try {
        const { tenantId, role } = req.user;
        const { memberId, cartItems, totalAmount, guestInfo } = req.body;

        const order = await prisma.$transaction(async (tx) => {
            let actualMemberId = null;
            let actualTenantId = tenantId || 1;

            if (role === 'MEMBER') {
                const memberRaw = await tx.$queryRaw`SELECT * FROM member WHERE userId = ${req.user.id}`;
                const member = memberRaw[0];
                if (!member) throw new Error("Member not found");
                actualMemberId = member.id;
                actualTenantId = member.tenantId;
            } else if (memberId) {
                actualMemberId = parseInt(memberId);
            }

            let finalTotal = 0;
            let itemsCount = 0;
            const orderItemsInput = [];

            for (const item of cartItems) {
                const product = await tx.storeProduct.findUnique({ where: { id: item.id } });
                if (!product) throw new Error(`Product ${item.id} not found`);
                if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

                await tx.storeProduct.update({
                    where: { id: product.id },
                    data: {
                        stock: product.stock - item.quantity,
                        status: (product.stock - item.quantity) === 0 ? 'Inactive' : ((product.stock - item.quantity) <= 10 ? 'Low Stock' : 'Active')
                    }
                });

                finalTotal += parseFloat(product.price) * parseInt(item.quantity);
                itemsCount += parseInt(item.quantity);

                orderItemsInput.push({
                    productId: product.id,
                    quantity: item.quantity,
                    priceAtBuy: product.price
                });
            }

            const newOrder = await tx.storeOrder.create({
                data: {
                    tenantId: actualTenantId,
                    memberId: actualMemberId,
                    guestName: guestInfo?.name,
                    guestPhone: guestInfo?.phone,
                    guestEmail: guestInfo?.email,
                    itemsCount,
                    total: finalTotal,
                    status: 'Completed', // POS orders are typically completed instantly
                    items: {
                        create: orderItemsInput
                    }
                }
            });
            return newOrder;
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("Store checkout error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const { role } = req.user;

        let where = {};
        if (role === 'MEMBER') {
            const memberRaw = await prisma.$queryRaw`SELECT * FROM member WHERE userId = ${req.user.id}`;
            const member = memberRaw[0];
            if (!member) return res.status(404).json({ message: 'Member profile not found' });

            where.memberId = member.id;
        } else if (role !== 'SUPER_ADMIN') {
            where.tenantId = req.user.tenantId;
        }

        const orders = await prisma.storeOrder.findMany({
            where,
            include: {
                member: true,
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { date: 'desc' }
        });

        const formatted = orders.map(o => ({
            id: o.id,
            total: o.total,
            items: o.itemsCount,
            status: o.status,
            date: new Date(o.date).toISOString().split('T')[0],
            member: o.member?.name || 'Unknown'
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Store orders error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Coupons
exports.getCoupons = async (req, res) => {
    try {
        const { status, search } = req.query;
        let where = {};

        if (req.user && req.user.role !== 'SUPER_ADMIN') {
            where.tenantId = req.user.tenantId;
        }

        if (status && status !== 'All Status') {
            where.status = status;
        }

        if (search) {
            where.code = { contains: search, mode: 'insensitive' };
        }

        const coupons = await prisma.coupon.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        res.json(coupons);
    } catch (error) {
        console.error("Get coupons error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getCouponStats = async (req, res) => {
    try {
        let where = {};
        if (req.user.role !== 'SUPER_ADMIN') {
            where.tenantId = req.user.tenantId;
        }

        const totalCoupons = await prisma.coupon.count({ where });
        const activeCoupons = await prisma.coupon.count({ where: { ...where, status: 'Active' } });
        const expiredCoupons = await prisma.coupon.count({
            where: {
                ...where,
                OR: [
                    { status: 'Expired' },
                    { endDate: { lt: new Date() } }
                ]
            }
        });

        const redemptions = await prisma.coupon.aggregate({
            where,
            _sum: {
                usedCount: true
            }
        });

        res.json({
            totalCoupons,
            activeCoupons,
            expiredCoupons,
            totalRedemptions: redemptions._sum.usedCount || 0
        });
    } catch (error) {
        console.error("Get coupon stats error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.createCoupon = async (req, res) => {
    try {
        const { code, description, type, value, minPurchase, maxUses, startDate, endDate, status, tenantId } = req.body;
        const actualTenantId = tenantId ? parseInt(tenantId) : req.user.tenantId;

        const coupon = await prisma.coupon.create({
            data: {
                tenantId: actualTenantId,
                code,
                description,
                type,
                value: parseFloat(value),
                minPurchase: minPurchase ? parseFloat(minPurchase) : 0,
                maxUses: maxUses ? parseInt(maxUses) : 0,
                startDate: startDate ? new Date(startDate) : new Date(),
                endDate: endDate ? new Date(endDate) : null,
                status: status || 'Active',
            }
        });

        res.status(201).json(coupon);
    } catch (error) {
        console.error("Create coupon error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, description, type, value, minPurchase, maxUses, startDate, endDate, status, tenantId } = req.body;

        const coupon = await prisma.coupon.update({
            where: { id: parseInt(id) },
            data: {
                code,
                description,
                type,
                value: value ? parseFloat(value) : undefined,
                minPurchase: minPurchase !== undefined ? parseFloat(minPurchase) : undefined,
                maxUses: maxUses !== undefined ? parseInt(maxUses) : undefined,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : null,
                status,
                tenantId: tenantId ? parseInt(tenantId) : undefined,
            }
        });

        res.json(coupon);
    } catch (error) {
        console.error("Update coupon error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.coupon.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        console.error("Delete coupon error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const { search } = req.query;
        let where = {};
        if (req.user && req.user.role !== 'SUPER_ADMIN') {
            where.tenantId = req.user.tenantId;
        }

        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        const categories = await prisma.storeCategory.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });

        res.json(categories);
    } catch (error) {
        console.error("Get categories error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, description, image, sortOrder, status } = req.body;
        const tenantId = req.user.tenantId || 1;

        let imageUrl = image;
        if (image && image.startsWith('data:image')) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                folder: 'gym/store/categories'
            });
            imageUrl = uploadRes.secure_url;
        }

        const category = await prisma.storeCategory.create({
            data: {
                tenantId,
                name,
                description,
                image: imageUrl,
                sortOrder: parseInt(sortOrder) || 0,
                status: status || 'Active',
            }
        });

        res.status(201).json(category);
    } catch (error) {
        console.error("Create category error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, sortOrder, status } = req.body;

        let imageUrl = image;
        if (image && image.startsWith('data:image')) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                folder: 'gym/store/categories'
            });
            imageUrl = uploadRes.secure_url;
        }

        const category = await prisma.storeCategory.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                image: imageUrl,
                sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : undefined,
                status,
            }
        });

        res.json(category);
    } catch (error) {
        console.error("Update category error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.storeCategory.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error("Delete category error:", error);
        res.status(500).json({ message: error.message });
    }
};
