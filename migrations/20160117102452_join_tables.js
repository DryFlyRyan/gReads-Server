
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author_book', function(table){
    table.increments().primary().unsigned();
    table.integer('author_id').unsigned().references('id').inTable('author').onDelete('cascade');
    table.integer('book_id').unsigned().references('id').inTable('book').onDelete('cascade');
  }).then(function(){
    return knex.schema.createTable('user_book', function(table){
      table.increments().primary().unsigned();
      table.integer('user_id').unsigned().references('id').inTable('user').onDelete('cascade');
      table.integer('book_id').unsigned().references('id').inTable('book').onDelete('cascade');
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('author_book').then(function(){
    knex.schema.dropTable('user_book')
  })
};
