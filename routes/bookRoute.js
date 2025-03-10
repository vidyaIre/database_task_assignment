const { createBook } = require('../controllers/bookController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

module.exports = router;

router.post('/createBook', errorHandler, createBook);
module.exports = router;