const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

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

const updateDatabase = async (user, date) => {
    try {
        user.emailSentTime = date;
        await user.save();
        //await sequelize.sync({ alter: true }); 
        console.log("Updated time");
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
