const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookControllers');


router.get('/',bookControllers.getAllBooks)
router.post('/', bookControllers.postBooks);
router.get('/:id', bookControllers.getBookById)
router.delete('/:id', bookControllers.deleteBook)
router.put('/:id', bookControllers.updateBook)

module.exports = router;