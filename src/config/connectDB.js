// https://sequelize.org/docs/v6/getting-started/
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    'd63m8huri282f9', // database
    'dybqwefxtfguek', // username
    '0edc2facb04ae0552289a91d9a479a9bab9522145284fadcc47e9915f11910d7',
    {
        host: 'ec2-23-23-151-191.compute-1.amazonaws.com',
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