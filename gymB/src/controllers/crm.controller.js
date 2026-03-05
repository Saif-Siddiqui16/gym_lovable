const prisma = require('../config/prisma');

// --- LEADS ---

const createLead = async (req, res) => {
    try {
        const { tenantId } = req.user;

        if (!tenantId) {
            return res.status(403).json({ message: 'Unauthorized: Your account is not associated with a specific branch.' });
        }

        const {
            name, phone, email, gender, age, interests, source,
            budgetRange, preferredContact, assignedTo, followUpDate, followUpTime, notes
        } = req.body;

        // Combine date and time to nextFollowUp
        let nextFollowUp = null;
        if (followUpDate) {
            nextFollowUp = new Date(followUpDate);
            if (followUpTime) {
                const [hours, minutes] = followUpTime.split(':');
                nextFollowUp.setHours(hours, minutes);
            }
        }

        const lead = await prisma.lead.create({
            data: {
                tenantId: tenantId,
                name,
                phone,
                email,
                gender,
                age: age ? parseInt(age) : null,
                interests: Array.isArray(interests) ? JSON.stringify(interests) : (interests || null),
                source,
                budget: budgetRange || null,
                preferredContact: preferredContact || "WhatsApp",
                assignedToId: assignedTo ? parseInt(assignedTo) : null,
                notes: notes || null,
                nextFollowUp,
                status: 'New'
            }
        });

        res.status(201).json(lead);
    } catch (error) {
        console.error('Create Lead Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const getLeads = async (req, res) => {
    try {
        const { tenantId, role } = req.user;
        const where = {};

        // Security: Limit by tenant unless Super Admin
        if (role !== 'SUPER_ADMIN') {
            if (!tenantId) {
                return res.json([]); // No branch access, no leads
            }
            where.tenantId = tenantId;
        }

        // Search & Filter
        const { search, status, assignedTo } = req.query;

        if (status && status !== 'All') where.status = status;

        // Strict: Trainers only see their assigned leads
        if (role === 'TRAINER') {
            where.assignedToId = req.user.id;
        } else if (assignedTo) {
            where.assignedToId = parseInt(assignedTo);
        }

        if (search) {
            where.OR = [
                { name: { contains: search } },
                { phone: { contains: search } },
                { email: { contains: search } }
            ];
        }

        const leads = await prisma.lead.findMany({
            where,
            include: {
                assignedTo: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(leads);
    } catch (error) {
        console.error('Get Leads Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const lead = await prisma.lead.findUnique({ where: { id: parseInt(id) } });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        if (status === 'Converted' && lead.status !== 'Converted') {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('123456', 10);
            const userEmail = lead.email || `m${Date.now()}@branch${lead.tenantId}.com`;

            // Check if user already exists
            let existingUser = await prisma.user.findUnique({ where: { email: userEmail } });
            if (existingUser) {
                return res.status(400).json({ message: `A user with email ${userEmail} already exists. Cannot convert lead.` });
            }

            // Create user
            const newUser = await prisma.user.create({
                data: {
                    name: lead.name,
                    email: userEmail,
                    password: hashedPassword,
                    phone: lead.phone,
                    role: 'MEMBER',
                    tenantId: lead.tenantId,
                    status: 'Active'
                }
            });

            // Create Member profile
            await prisma.member.create({
                data: {
                    userId: newUser.id,
                    tenantId: lead.tenantId,
                    memberId: `MEM-LEAD-${Date.now()}-${lead.tenantId}`,
                    name: lead.name,
                    email: userEmail,
                    phone: lead.phone,
                    status: 'Active',
                    joinDate: new Date(),
                    gender: lead.gender || 'Other',
                    source: lead.source || 'Walk-in',
                    benefits: '[]' // Fixed: benefits must be a string in schema
                }
            });
        }

        const updatedLead = await prisma.lead.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, source, notes, age, gender, budgetRange } = req.body;

        const updatedLead = await prisma.lead.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                phone,
                source,
                notes,
                age: age ? parseInt(age) : undefined,
                gender,
                budget: budgetRange
            }
        });

        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete dependent follow-ups first
        await prisma.followUp.deleteMany({
            where: { leadId: parseInt(id) }
        });

        await prisma.lead.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- FOLLOW-UPS ---

const getTodayFollowUps = async (req, res) => {
    try {
        const { tenantId, role } = req.user;

        if (!tenantId && role !== 'SUPER_ADMIN') {
            return res.json([]);
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const where = {
            nextFollowUp: { gte: startOfDay, lte: endOfDay },
            status: { notIn: ['Converted', 'Lost'] }
        };

        if (role !== 'SUPER_ADMIN') {
            where.tenantId = tenantId;
        }

        const leads = await prisma.lead.findMany({
            where,
            include: {
                assignedTo: { select: { id: true, name: true } }
            }
        });

        res.json(leads);
    } catch (error) {
        console.error('Get Followups Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const addFollowUp = async (req, res) => {
    try {
        const { leadId } = req.params;
        const { notes, nextDate, status } = req.body;

        const followUp = await prisma.followUp.create({
            data: {
                leadId: parseInt(leadId),
                notes,
                nextDate: nextDate ? new Date(nextDate) : null,
                status: status || 'Completed'
            }
        });

        // Update lead's next follow-up and status if needed
        await prisma.lead.update({
            where: { id: parseInt(leadId) },
            data: {
                nextFollowUp: nextDate ? new Date(nextDate) : null,
                updatedAt: new Date()
            }
        });

        res.status(201).json(followUp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLead,
    getLeads,
    updateLeadStatus,
    updateLead,
    deleteLead,
    getTodayFollowUps,
    addFollowUp
};
