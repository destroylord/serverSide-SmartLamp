// var app = require('express')()
// var http = require('http').Server(app)
// var io = require('socket.io')(http)
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const five = require('johnny-five')
const board = new five.Board({ repl: true })

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

app.get('/', function (req, res) {
  res.sendFile('/home/destroylord/arduino/j5/index.html')
})

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  board.on('ready', () => {
    socket.on('ping', () => {
      var relay = new five.Relay({ pin: 13 }) // default type:

      relay.open()
      console.log('detection Manusia')
    })
  })

  board.on('ready', () => {
    socket.on('dead', () => {
      var relay = new five.Relay({ pin: 13 }) // default type:

      relay.close()
      console.log('Manusianya Gak Ada')
    })
  })
})
// Source LED
//   board.on('ready', () => {
//     socket.on('ping', () => {
//       var led = new Led(13)
//       led.on()
//       console.log('detection Manusia')
//     })
//   })

//   board.on('ready', () => {
//     socket.on('dead', () => {
//       var led = new Led(13)
//       led.off()
//       console.log('Lampunya mati')
//     })
//   })
// })

server.listen(5000, () => {
  console.log('listening on http://127.0.0.1:5000/')
})
