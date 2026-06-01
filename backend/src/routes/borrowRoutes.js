const express =  require('express');
const router = express.Router();
const borrowController = require("../controllers/borrowControllers")

router.get('/', borrowController.getBookBorrowed);
router.get('/:id', borrowController.getBookBorrowedById);
router.post("/newBorrow", borrowController.postBookBorrowed)
router.delete('/:id', borrowController.deleteBookBorrow)

module.exports = router;


