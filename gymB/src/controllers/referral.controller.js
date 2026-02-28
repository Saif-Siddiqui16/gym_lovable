const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllReferrals = async (req, res) => {
    try {
        const { branchId } = req.query;
        const whereClause = { source: 'Referral' };

        if (branchId && branchId !== 'all') {
            whereClause.tenantId = parseInt(branchId);
        } else if (req.user && req.user.tenantId) {
            whereClause.tenantId = req.user.tenantId;
        }

        const rawLeads = await prisma.lead.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });

        const formatted = await Promise.all(rawLeads.map(async (lead) => {
            let referrerName = 'N/A';
            let referrerId = null;
            let rewardStatus = 'Pending';
            if (lead.notes) {
                try {
                    const notesData = JSON.parse(lead.notes);
                    if (notesData.referrerId) {
                        referrerId = notesData.referrerId;
                        const referrer = await prisma.member.findFirst({
                            where: { memberId: String(notesData.referrerId) }
                        });
                        if (referrer) {
                            referrerName = referrer.name || referrer.memberId;
                        }
                    }
                } catch (e) { }
            }
            return {
                id: lead.id,
                referredName: lead.name,
                phone: lead.phone,
                email: lead.email,
                referrerId,
                referrerName,
                status: lead.status === 'Converted' ? 'Converted' : (lead.status === 'New' ? 'Pending' : lead.status),
                rewardStatus,
                createdAt: lead.createdAt
            };
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Error fetching referrals:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createReferral = async (req, res) => {
    try {
        const { referrerId, referredName, phone, email, branchId } = req.body;

        let tenantId = req.user && req.user.tenantId;
        if (!tenantId) {
            if (branchId && branchId !== 'all') {
                tenantId = parseInt(branchId);
            } else {
                const firstTenant = await prisma.tenant.findFirst();
                tenantId = firstTenant ? firstTenant.id : 1;
            }
        }

        const newLead = await prisma.lead.create({
            data: {
                tenantId: tenantId,
                name: referredName,
                phone,
                email,
                source: 'Referral',
                status: 'New',
                notes: JSON.stringify({ referrerId })
            }
        });

        res.status(201).json(newLead);
    } catch (error) {
        console.error("Error creating referral:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.verifyCode = async (req, res) => {
    try {
        const { code } = req.params;
        const { branchId } = req.query;

        const whereClause = { memberId: code };

        if (branchId && branchId !== 'all') {
            whereClause.tenantId = parseInt(branchId);
        } else if (req.user && req.user.tenantId) {
            whereClause.tenantId = req.user.tenantId;
        }

        const member = await prisma.member.findFirst({
            where: whereClause
        });

        if (!member) {
            return res.json({ valid: false });
        }

        res.json({
            valid: true,
            referrerName: member.name || member.memberId
        });
    } catch (error) {
        console.error("Error verifying code:", error);
        res.status(500).json({ message: "Server error" });
    }
};
