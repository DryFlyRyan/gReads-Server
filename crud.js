var knex = require('./db/knex');
var pg = require('pg');
var config = {
  client: 'pg',
  connection: 'postgres://localhost/dander',
  ssl: true
}
require('dotenv').load();

//Table Shorthands
var User = function() {
  return knex('user')
}
var Book = function() {
  return knex('book')
}
var Author = function() {
  return knex('author')
}
var User_Book = function() {
  return knex('user_book')
}
var Author_Book = function() {
  return knex('author_book')
}

//User Table CRUD
function createUser(first_name, last_name, email, password) {
  return User().insert({
    first_name  : first_name,
    last_name   : last_name,
    email       : email,
    password    : password
  }, 'id')
}

function readUsers() {
  return User().select().then(function(user) {
    return user;
  })
}

function readUser(id) {
  return User().select().where({
    id          : id
  }).then(function(user) {
    return user;
  })
}

function searchUser(email) {
  return User().select().where({
    email       : email
  }).first().then(function(user) {
    return user;
  })
}

//Author Table CRUD

function createAuthor(first_name, last_name, biography, photo_url) {
  return Author().insert({
    first_name  : first_name,
    last_name   : last_name,
    biography   : biography,
    photo_url   : photo_url
  }, 'id').returning('id').then(function(id){
    return id;
  })
}

function readAuthors() {
  return Author().select().then(function(authors) {
    return authors;
  })
}

function readAuthor(id) {
  return Author().select().where({
    id          : id
  }).then(function(author) {
    return author;
  })
}

function searchAuthor(first_name, last_name) {
  return Author().where({
    first_name  : first_name,
    last_name   : last_name
  }).first().then(function(author) {
    console.log(author);
    return author;
  })
}

//Book Table CRUD

function createBook(title, genre, description, photo_url) {
  return Book().insert({
    title       : title,
    genre       : genre,
    description : description,
    photo_url   : photo_url
  }, 'id').returning('id').then(function(id) {
    return id;
  })
}

function readBooks() {
  return Book().select().then(function(book){
    return book;
  })
}

function readBook(id) {
  return Book().select().where({
    id          : id
  }).then(function(book){
    return book;
  })
}

function searchBook(title) {
  return Book().select().where({
    title       : title
  }).first().then(function(book) {
    console.log(book);
    return book;
  })
}

//User_Book Join Table CRUD



//Author_Book Join Table CRUD

function createAuthorBookJoin(book_id, author_id) {
  return Author_Book().insert({
    book_id     : book_id,
    author_id   : author_id
  }, 'id').returning('id').then(function(id){
    return id;
  })
}

module.exports  = {
  //User Functions
  User            : {
    createUser    : createUser,
    readUsers     : readUsers,
    readUser      : readUser,
    searchUser    : searchUser
  },
  Author          : {
    createAuthor  : createAuthor,
    readAuthors   : readAuthors,
    readAuthor    : readAuthor,
    searchAuthor  : searchAuthor
  },
  Book            : {
    createBook    : createBook,
    readBooks     : readBooks,
    readBook      : readBook,
    searchBook    : searchBook
  },
  Author_Book     : {
    AuthorBookJoin: createAuthorBookJoin
  }
}
