const { createBook,
    getAllBook,
    insertMultipleBooks,
    getBooksByAuthor,
    updateBook,
    updateByPriceAndStock,
    softDeleteBook, 
    softDeletedByTitle,
    getBooksByPriceRange,
    getTotalBooks,
    getSoretedBooks} = require('../controllers/bookController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

module.exports = router;

router.post('/createBook', errorHandler, createBook);
router.get('/getAllBook', errorHandler, getAllBook);
router.post('/insertMultipleBooks', errorHandler, insertMultipleBooks);
router.get('/getBooksByAuthor', errorHandler, getBooksByAuthor);
router.put('/updateBook', errorHandler, updateBook);
router.put('/updateByPriceAndStock', errorHandler, updateByPriceAndStock);
router.delete('/softDeleteBook', errorHandler, softDeleteBook);
router.delete('/softDeletedByTitle', errorHandler, softDeletedByTitle);
router.get('/getBooksByPriceRange', errorHandler, getBooksByPriceRange);
router.get('/getTotalBooks', errorHandler, getTotalBooks);
router.get('/getSoretedBooks', errorHandler, getSoretedBooks);

module.exports = router;