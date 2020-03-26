const express = require('express')//npm
const app = express()
const bodyParser = require('body-parser')//npm
const Usuarios = require('./models/Usuarios')
const handlebars = require('express-handlebars')//npm
const admin = require('./routes/admin')
const path = require('path')
const flash = require('connect-flash') //npm
app.use(flash())
const session = require('express-session')
app.use(session({ cookie: { maxAge: 60000 }, secret: 'woot', resave: false, saveUninitialized: false}))


//BODY PARSER CONFIG
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//HANDLEBARS CONFIG
app.engine('handlebars', handlebars({defalutLayou: 'main'}))
app.set('view engine', 'handlebars')
//PUBLIC CONFIG
app.use(express.static('public'))

//ROTAS
app.get('/listamedicos', function(req, res){
    Usuarios.findAll({order: [['nome_medico' ]]}).then(function(usuarios){
        res.render('listamedicos.handlebars', {usuarios: usuarios})
    })
})
app.get('/cadastrar', function(req, res){
    res.render('cadastrar.handlebars')
})
app.post('/cadastro', function(req, res){
    Usuarios.create({
        nome_medico: req.body.nome_medico,
        email_medico: req.body.email_medico,
        crm_medico: req.body.crm_medico,
        tel_medico: req.body.tel_medico,
        especialidade_medico: req.body.especialidade_medico.join('; ')
    }).then(function(){
        res.redirect('/listamedicos')
    }).catch(function(erro){
        res.send('Hove um erro.' + erro)
    })
})
app.get('/editar/:id', function(req, res){
    Usuarios.findOne({where: {'id': req.params.id}}).then(function(usuarios){
        res.render('editar.handlebars', {usuarios: usuarios})
    }).catch((err) => {
        console.log(err + 'O erro é')
        req.flash('Usuario Inexistente')
        res.redirect('/listamedicos')
    })
})

app.post('/editado', function(req, res){
    Usuarios.findOne({where: {id: req.body.id}}).then(function(usuarios){
        usuarios.nome_medico = req.body.nome_medico,
        usuarios.email_medico = req.body.email_medico,
        usuarios.crm_medico = req.body.crm_medico,
        usuarios.tel_medico = req.body.tel_medico,
        usuarios.especialidade_medico = req.body.especialidade_medico

        usuarios.save().then(function(){
            req.flash('Salvo com Sucesso')
            res.redirect('/listamedicos')
        }).catch((err) => {
            console.log(err + 'O erro é')
            req.flash('Houve um erro ao Editar a Postagem')
            res.redirect('/listamedicos')
        })
    }).catch((err) => {
        console.log(err + 'O erro é')
        req.flash('Erro')
        res.redirect('/listamedicos')
    })    
})

app.get('/excluir/:id', function(req, res){
    Usuarios.destroy({where: {'id': req.params.id}}).then(function(){
        res.render('excluido.handlebars')
    }).catch(function(erro){
        res.send('MEDICO NÃO EXISTE')
    })
})
//LIGAÇÃO DO SERVIDOR, ULTIMA LINHA DO CODIGO
app.listen(8085, function(){
    console.log('SERVIDOR RODANDO NA PORTA: 8085!!')
})

/*    Usuarios.findOne({where: {'id': req.body.id}}).then(function(usuarios){
        usuarios.nome_medico = req.body.nome_medico
        usuarios.email_medico = req.body.email_medico
        usuarios.crm_medico = req.body.crm_medico
        usuarios.tel_medico = req.body.tel_medico
        usuarios.especialidade_medico = req.body.especialidade_medico

        usuarios.save().then(() => {
            req.flash('EDITADO COM SUCESSO')
            res.redirect('/listamedicos')
        }).catch((err) => {
            req.flash('ERRO AO EDITAR')
            res.redirect('/listamedicos')            
        })

    }).catch((err) => {
        req.flash('ERRO AO EDITAR')
        req.redirect('/listamedicos')
    }) */