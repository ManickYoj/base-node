module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PSQL_DEV_HOST,
      database: 'development',
      user: process.env.PSQL_DEV_USER,
      password: process.env.PSQL_DEV_PW,
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
