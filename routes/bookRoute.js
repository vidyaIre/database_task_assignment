const { createBook, getAllBook, insertMultipleBooks, getBooksByAuthor, updateBook, updateByPriceAndStock } = require('../controllers/bookController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

module.exports = router;

router.post('/createBook', errorHandler, createBook);
router.get('/getAllBook', errorHandler, getAllBook);
router.post('/insertMultipleBooks',errorHandler, insertMultipleBooks);
router.get('/getBooksByAuthor', errorHandler, getBooksByAuthor);
router.put('/updateBook', errorHandler, updateBook);
router.put('/updateByPriceAndStock', errorHandler, updateByPriceAndStock);

module.exports = router;