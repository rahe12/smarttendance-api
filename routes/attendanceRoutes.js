const express = require('express');
const router = express.Router();
const attendanceCtrl = require('../controllers/attendanceController');

router.post('/', attendanceCtrl.markAttendance);
router.get('/', attendanceCtrl.getAttendance);

module.exports = router;
