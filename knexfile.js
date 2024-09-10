module.exports = {
    client: 'postgresql',
    connection: {
        user: 'wekisley',
        password: '998010',
        database: 'tasks_app'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
    }
}