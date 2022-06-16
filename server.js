const express = require('express')
const fetch = require('node-fetch')
const http = require('http')
const keys = require('./config/keys');
const { Server } = require('socket.io')

const apiProduct = require('./apiProduct')
const apiMessage = require('./apiMessage')

const app = express()
const server = http.createServer(app);
const io = new Server(server)

const PORT = process.env.PORT || 8080

app.use(express.static('./views'))

app.set('views','./views')
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/productos',apiProduct)
app.use('/mensajes',apiMessage)

app.get('/',(req,res)=>{
  res.render('index')
})

app.post('/store',(req,res)=>{
  fetch(`${keys.redirectDomain}/productos`,{method: 'post', body: JSON.stringify(req.body),headers: {'Content-Type': 'application/json'}})
    .then(promesa => promesa.text() )
    .then(data => res.render('index',{isSaved:'saved'}))
})

app.post('/communication',(req,res)=>{
  fetch(`${keys.redirectDomain}/mensajes`,{method: 'post', body: JSON.stringify(req.body),headers: {'Content-Type': 'application/json'}})
    .then(promesa => promesa.text() )
    .then(data => res.render('index'))
})

io.on('connection',socket=>{
  //console.log('User conectado, id2: '+ socket.id);  

  socket.on('loadProducts', (newMessage)=>{
    io.sockets.emit('loadProductClient','messages')
  })

  socket.on('loadMessages', (newMessage)=>{
    io.sockets.emit('loadMessageClient','messages')
  })  

})

server.listen(PORT,()=>{
  console.log(`Server http on ${PORT}...`)
})

server.on('error',error=> console.log('Error on server',error))