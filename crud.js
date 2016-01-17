var knex = require('./db/knex');
var pg = require('pg');
var config = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost/dander',
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
    first_name: first_name,
    last_name : last_name,
    email     : email,
    password  : password
  }, 'id')
}

function readUsers() {
  return User().select().then(function(user) {
    return user;
  })
}

function readUser(id) {
  return User().select().where({
    id        : id
  }).then(function(user) {
    return user;
  })
}

//Book Table CRUD



//Author Table CRUD



//User_Book Join Table CRUD



//Author_Book Join Table CRUD

module.exports  = {
  //User Functions
  User          : {
    createUser  : createUser,
    readUsers   : readUsers,
    readUser    : readUser
  }
}
