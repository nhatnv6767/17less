// https://sequelize.org/docs/v6/getting-started/
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('checkdata', 'root', null, {
    host: 'localhost',
    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialect: 'mysql'
});

let connectDB = () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;