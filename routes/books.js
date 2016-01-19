var express = require('express');
var router = express.Router();
var crud = require('../crud')

/* GET home page. */
router.get('/', function(req, res, next) {
  crud.Book.readBooks()
  .then(function(books) {
    if (books) {
      res.json(books);
    } else {
      res.send('Data not found')
    }
  });
});

router.post('/readBook', function(req,res,next){
  id = parseInt(req.body.id)
  crud.Book.readBook(id)
  .then(function(book){
    if(book) {
      res.json(book);
    } else {
      res.send('Data not found')
    }
  })
})

module.exports = router;
