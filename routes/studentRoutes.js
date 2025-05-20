const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/studentController');

router.post('/', studentCtrl.addStudent);
router.get('/', studentCtrl.getStudents);
router.put('/:id', studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);

module.exports = router;
