/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary()
        table.integer('userId').references('id')
            .inTable('users').notNullable()
        table.string('title').notNullable()
        table.text('description')
        table.dateTime('toDoDate').notNullable()
        table.integer('duration')
        table.dateTime('doneDate')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tasks');
};
