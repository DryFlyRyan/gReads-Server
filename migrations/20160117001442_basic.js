
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user',
  function(table){
    table.increments().primary().unsigned();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.string('profile_id');
  }).then(function(){
    return knex.schema.createTable('author',
    function(table){
      table.increments().primary().unsigned();
      table.string('first_name');
      table.string('last_name');
      table.text('biography');
      table.text('photo_url');
      table.text('reference_id');
  }).then(function(){
    return knex.schema.createTable('book',
    function(table){
        table.increments().primary().unsigned();
        table.string('title');
        table.string('genre');
        table.text('description');
        table.string('photo_url');
      })
    })
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user')
  .then(function(){
    return knex.schema.dropTable('author');
  }).then(function(){
    return knex.schema.dropTable('book')
  })
};
