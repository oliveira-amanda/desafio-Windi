
exports.up = function(knex) {
    return knex.schema.createTable('vehicles', function (table) {
        table.increments();

        table.string('vehiclePlate').notNullable();
        table.string('brand').notNullable();
        table.string('modelYear').notNullable();
        table.string('mileage').notNullable();
        table.string('optional').notNullable();

        table.string('user_id').notNullable();
        
        table.foreign('user_id').references('id').inTable('users');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('vehicles');
  };
  