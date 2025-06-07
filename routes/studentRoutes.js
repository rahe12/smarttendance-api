const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/studentController');

// Student routes
router.post('/', studentCtrl.addStudent);
router.get('/', studentCtrl.getStudents);
router.put('/:id', studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);

// People management routes
router.post('/people', studentCtrl.addPerson);
router.get('/people', studentCtrl.getPeople);
router.get('/people/:id', studentCtrl.getPersonById);
router.put('/people/:id', studentCtrl.updatePerson);
router.delete('/people/:id', studentCtrl.deletePerson);

module.exports = router;
