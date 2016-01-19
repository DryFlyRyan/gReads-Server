var express = require('express');
var router = express.Router();
var crud = require('../crud')

/* GET home page. */
router.get('/books', function(req, res, next) {
  crud.Book.readBooks()
  .then(function(books) {
    if (books) {
      res.json(books);
    } else {
      res.send('Data not found')
    }
  });
});

module.exports = router;
