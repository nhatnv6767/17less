// https://sequelize.org/docs/v6/getting-started/
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Option 3: Passing parameters separately (other dialects)
let db_name=process.env.DB_DATABASE_NAME
let db_username=process.env.DB_USERNAME
let db_password=process.env.DB_PASSWORD
let db_host=process.env.DB_HOST
const sequelize = new Sequelize(
    db_name, // database
    db_username, // username
    db_password,
    {
        host: db_host,
        /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;