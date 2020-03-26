const bancodados = require('./bancodados')

const Usuarios = bancodados.sequelize.define('usuarios', {
    nome_medico: {
        type: bancodados.Sequelize.STRING
    },
    email_medico: {
        type: bancodados.Sequelize.TEXT
    },
    crm_medico: {
         type: bancodados.Sequelize.STRING
    },
    tel_medico: {
        type: bancodados.Sequelize.STRING
    },
    especialidade_medico: {
        type: bancodados.Sequelize.STRING
    }
 })

module.exports = Usuarios

//Usuarios.sync({force: true})
    //foto:
