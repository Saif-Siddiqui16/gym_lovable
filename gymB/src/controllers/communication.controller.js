const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET Stats for Communication Hub
const getCommStats = async (req, res) => {
    try {
        const { branchId } = req.query;
        const tenantId = branchId && branchId !== 'all' ? parseInt(branchId) : (req.user.tenantId || 1);

        const [totalAnnouncements, activeAnnouncements, totalLogs, totalTemplates] = await Promise.all([
            prisma.announcement.count({ where: { tenantId } }),
            prisma.announcement.count({ where: { tenantId, status: 'Active' } }),
            prisma.communicationLog.count({ where: { tenantId } }),
            prisma.messageTemplate.count({ where: { tenantId } })
        ]);

        res.json({
            totalAnnouncements,
            activeAnnouncements,
            messagesSent: totalLogs,
            templates: totalTemplates
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET Announcements
const getAnnouncements = async (req, res) => {
    try {
        const { branchId, search } = req.query;
        const tenantId = branchId && branchId !== 'all' ? parseInt(branchId) : (req.user.tenantId || 1);

        let where = { tenantId };
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { content: { contains: search } }
            ];
        }

        const announcements = await prisma.announcement.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE Announcement
const createAnnouncement = async (req, res) => {
    try {
        const { title, content, targetRole, priority, status } = req.body;
        const tenantId = req.user.tenantId || 1;
        const authorId = req.user.id;

        const announcement = await prisma.announcement.create({
            data: {
                tenantId,
                authorId,
                title,
                content,
                targetRole: targetRole || 'all',
                priority: parseInt(priority) || 0,
                status: status || 'Active'
            }
        });

        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET Templates
const getTemplates = async (req, res) => {
    try {
        const { branchId, channel } = req.query;
        const tenantId = branchId && branchId !== 'all' ? parseInt(branchId) : (req.user.tenantId || 1);

        let where = { tenantId };
        if (channel) where.channel = channel;

        const templates = await prisma.messageTemplate.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SEND Broadcast
const sendBroadcast = async (req, res) => {
    try {
        const { channel, message, audience, templateId } = req.body;
        const tenantId = req.user.tenantId || 1;
        const senderId = req.user.id;

        // In a real app, this would integrate with WhatsApp/SMS/Email providers
        // For now, we log the communication
        const log = await prisma.communicationLog.create({
            data: {
                tenantId,
                senderId,
                channel,
                message,
                status: 'Sent'
            }
        });

        res.json({ message: `Broadcast sent via ${channel}`, log });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET Communication Logs
const getCommLogs = async (req, res) => {
    try {
        const { branchId } = req.query;
        const tenantId = branchId && branchId !== 'all' ? parseInt(branchId) : (req.user.tenantId || 1);

        const logs = await prisma.communicationLog.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCommStats,
    getAnnouncements,
    createAnnouncement,
    getTemplates,
    sendBroadcast,
    getCommLogs
};
