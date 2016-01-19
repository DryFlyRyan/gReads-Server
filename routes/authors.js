var express = require('express');
var router = express.Router();
var crud = require('../crud')

/* GET home page. */
router.get('/', function(req, res, next) {
  crud.Author.readAuthors()
  .then(function(authors) {
    if (authors) {
      res.json(authors);
    } else {
      res.send('Data not found')
    }
  });
});

router.post('/readAuthor', function(req,res,next){
  id = parseInt(req.body.id)
  crud.Author.readAuthor(id)
  .then(function(author){
    if(author) {
      res.json(author);
    } else {
      res.send('Data not found')
    }
  })
})

router.post('/new', function(req, res, next){
  crud.Author.createAuthor(req.body.first_name, req.body.last_name, req.body.photo_url, req.body.biography)
  .then(function(){
    res.status(200).send('Author created')
  })
})

module.exports = router;
