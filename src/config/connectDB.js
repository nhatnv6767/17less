// https://sequelize.org/docs/v6/getting-started/
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialect: 'mysql'
});