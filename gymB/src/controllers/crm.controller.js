const prisma = require('../config/prisma');

// --- LEADS ---

const createLead = async (req, res) => {
    try {
        // Use Header for Multi-Branch selector, or User's primary tenantId as fallback
        const headerTenantId = req.headers['x-tenant-id'];
        const tenantId = headerTenantId ? parseInt(headerTenantId) : req.user.tenantId;

        if (!tenantId) {
            return res.status(400).json({ message: 'Tenant ID is required. Please select a branch or ensure your account is associated with a gym.' });
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

        // Create initial follow-up task if date is provided
        if (nextFollowUp) {
            await prisma.followUp.create({
                data: {
                    leadId: lead.id,
                    status: 'Pending',
                    nextDate: nextFollowUp,
                    notes: 'Initial Follow-up Schedule'
                }
            });
        }

        res.status(201).json(lead);
    } catch (error) {
        console.error('Create Lead Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const getLeads = async (req, res) => {
    try {
        const headerTenantId = req.headers['x-tenant-id'];
        const tenantId = headerTenantId ? parseInt(headerTenantId) : req.user.tenantId;

        const where = {};

        if (tenantId) {
            where.tenantId = tenantId;
        } else if (req.user.role === 'BRANCH_ADMIN') {
            // If BRANCH_ADMIN has no specific tenant selected (All Branches),
            // we should show all branches they have access to.
            const branches = await prisma.tenant.findMany({
                where: {
                    OR: [
                        { id: req.user.tenantId },
                        { owner: req.user.email },
                        { owner: req.user.name }
                    ]
                },
                select: { id: true }
            });
            where.tenantId = { in: branches.map(b => b.id) };
        }

        // Search & Filter
        const { search, status, assignedTo } = req.query;

        if (status && status !== 'All') where.status = status;

        // Strict: Trainers only see their assigned leads
        if (req.user.role === 'TRAINER') {
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
                followUps: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                },
                assignedTo: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(leads);
    } catch (error) {
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
        const tenantId = req.user.tenantId;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find leads that have a nextFollowUp date within today
        const leads = await prisma.lead.findMany({
            where: {
                tenantId: tenantId ? tenantId : undefined,
                nextFollowUp: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                status: { notIn: ['Converted', 'Lost'] }
            },
            include: {
                assignedTo: { select: { id: true, name: true } }
            }
        });

        res.json(leads);
    } catch (error) {
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
