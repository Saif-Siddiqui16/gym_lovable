const express = require('express');
const {
    getCommStats,
    getAnnouncements,
    createAnnouncement,
    getTemplates,
    sendBroadcast,
    getCommLogs
} = require('../controllers/communication.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('SUPER_ADMIN', 'BRANCH_ADMIN', 'MANAGER'));

router.get('/stats', getCommStats);
router.get('/announcements', getAnnouncements);
router.post('/announcements', createAnnouncement);
router.get('/templates', getTemplates);
router.post('/broadcast', sendBroadcast);
router.get('/logs', getCommLogs);

module.exports = router;
