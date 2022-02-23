const Sequelize = require("sequelize");

const database = new Sequelize('database', 'user', 'password', {
    host: "localhost",
    dialect: "sqlite",
    loggin: "false",
    storage: "database.sqlite",
    define: {
        freezeTableName: true
    }
})

module.exports.Economy = database.define('economy', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    balance: Sequelize.INTEGER
})