var fs = require('fs')
var crud = require('./crud')

//Converter Class
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonArray) {
   saveArray(jsonArray);
});

//read from file
require("fs").createReadStream("./csv_imports/gReads_import.csv").pipe(converter);

function saveArray(array) {
  for (var i = 0; i < array.length; i++) {
    var book = array[i];
    searchThenAddBook(book)
    .then(function(id) {
      var bookID = id;
      Promise.all([
        searchThenAddAuthor(
          book['Author 1 First Name'],
          book['Author 1 Last Name'],
          book['Author 1 Biography'],
          book['Author 1 Portrait URL'],
          bookID
        ),
        searchThenAddAuthor(
          book['Author 2 First Name'],
          book['Author 2 Last Name'],
          book['Author 2 Biography'],
          book['Author 2 Portrait URL'],
          bookID
        ),
        searchThenAddAuthor(
          book['Author 3 First Name'],
          book['Author 3 Last Name'],
          book['Author 3 Biography'],
          book['Author 3 Portrait URL'],
          bookID
        ).then(function(){
          resolve('Book Added')
        })
      ])
    })
  }
}

function searchThenAddBook(book){
  return new Promise(function(resolve, reject) {
    crud.Book.searchBook(book['Book Title'])
    .then(function(book) {
      console.log(book);
      if(book.length < 1) {
        crud.Book.createBook(
          book['Book Title'],
          book['Book Genre'],
          book['Book Description'],
          book['Book Cover URL']
        ).then(function(id) {
          resolve(id);
        })
      } else {
        throw new Error('Book already exists')
      }
    })
  })
}

function searchThenAddAuthor(first_name, last_name, biography, photo_url, book_id){
  return new Promise(function(resolve, reject) {
    if(first_name.length > 1) {
      crud.Author.searchAuthor(first_name, last_name, biography)
      .then(function(author) {
        console.log(author);
        if(author) {
          crud.Author.createAuthor(
            first_name,
            last_name,
            biography,
            photo_url
          )
          .then(function(id){
            crud.Author_Book.AuthorBookJoin(book_id, id)
          })
          .then(function(id){
            resolve(id);
          })
        } else {
          throw new Error('Author already exists')
        }
      })
    } else {
      reject('No Data Listed');
    }
  })
}
