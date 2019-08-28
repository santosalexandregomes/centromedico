const express = require('express')
const app = express()


app.get('/', function(req, res){
    res.send('Ola Braseal.')
})
app.get('/home', function(req, res){
    res.sendFile(__dirname + '/html/index.html')
})

//LIGAÇÃO DO SERVIDOR, ULTIMA LINHA DO CODIGO
app.listen(8085, function(){
    console.log('SERVIDOR RODANDO NA PORTA: 8085!!')
})

