const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const model = require('./User');
const dbName = "Cloud_db";

const sequelize = new Sequelize({
   dialect: process.env.DB_DIALECT,
   host: process.env.DB_HOST,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
});

const User = model(sequelize);

const updateDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        logger.info(`Database ${dbName} updated successfully.`);
    } catch (error) {
        console.error('Error updating database:', error);
        throw error;
    }
}

module.exports = {
    updateDatabase,
    sequelize, 
    User 
}