const express =  require('express');
const router = express.Router();
const studentControllers = require('../controllers/studentControllers');

router.get('/',studentControllers.getAllStudents);
router.get('/:id', studentControllers.getStudentsById);
router.post('/newStudent', studentControllers.postNewStudent);
router.delete('/:id', studentControllers.deleteStudent);
router.patch('/:id', studentControllers.updateStudent);

module.exports = router;