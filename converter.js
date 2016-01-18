var fs = require('fs')
var crud = require('./crud')
var forEach = require('async-foreach').forEach;

//Converter Class
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonArray) {
  // console.log(jsonArray);
   saveArray(jsonArray);
});

//read from file
require("fs").createReadStream("./csv_imports/gReads_import.csv").pipe(converter);

function saveArray(array) {
  forEach(array, function(book) {
    var done = this.async();
    searchThenAddBook(book)
    .then(function(id) {
      var bookID = id;
      if (book['Author 1 First Name']) {
        searchThenAddAuthor(
          book['Author 1 First Name'],
          book['Author 1 Last Name'],
          book['Author 1 Biography'],
          book['Author 1 Portrait URL'],
          bookID
        )
        .then(function(){
          if (book['Author 2 First Name']) {
            searchThenAddAuthor(
              book['Author 2 First Name'],
              book['Author 2 Last Name'],
              book['Author 2 Biography'],
              book['Author 2 Portrait URL'],
              bookID
            )
            .then(function(){
              if(book['Author 3 First Name']) {
                searchThenAddAuthor(
                  book['Author 3 First Name'],
                  book['Author 3 Last Name'],
                  book['Author 3 Biography'],
                  book['Author 3 Portrait URL'],
                  bookID
                )
              }
            })
          }
        })
      }
    })
    .then(function(){
      done();
    })
  })
}

function searchThenAddBook(book){
  return new Promise(function(resolve, reject) {
    crud.Book.searchBook(book['Book Title'])
    .then(function(foundBook) {
      if(!foundBook) {
        crud.Book.createBook(
          book['Book Title'],
          book['Book Genre'],
          book['Book Description'],
          book['Book Cover URL']
        ).then(function(id) {
          resolve(id);
        })
      } else {
        reject("Book entry already exists")
      }
    })
  })
}

function searchThenAddAuthor(first_name, last_name, biography, photo_url, book_id){
  return new Promise(function(resolve, reject) {
    if(first_name.length > 0) {
      console.log(first_name);
      console.log(last_name);
      crud.Author.searchAuthor(first_name, last_name)
      .then(function(author) {
        console.log(author);
        if(!author) {
          crud.Author.createAuthor(
            first_name,
            last_name,
            biography,
            photo_url
          )
          .then(function(id){
            crud.Author_Book.AuthorBookJoin(parseInt(book_id), parseInt(id))
          })
          .then(function(id){
            resolve(id);
          })
        } else {
          crud.Author_Book.AuthorBookJoin(parseInt(book_id), parseInt(author.id))
          .then(function(id){
            resolve(id);
          })
        }
      })
    }
    resolve();
  })
}
