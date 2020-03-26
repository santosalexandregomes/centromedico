const Sequelize = require('sequelize')
const sequelize = new Sequelize('alexandresantos', 'root', 'op040209',{
host: 'localhost',
dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}


/*--TESTE DE CONEXÃO COM O BANCO DE DADOS MYSQL---
sequelize.authenticate().then(function(){
    console.log('Conectado com Sucesso')
}).catch(function(erro){
    console.log('Não Conectado ERRO' + erro)
})*/

