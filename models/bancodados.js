const Sequelize = require('sequelize')
const sequelize = new Sequelize('alexandresantos', 'root2', '123456',{
host: 'localhost',
dialect: 'mysql'
})

module.export = {
    Sequelize : Sequelize,
    sequelize : sequelize
}