const express = require('express')
const socket = require('socket.io')
const http = require('http')
//  const cors = require('cors')
// const moment = require('moment')
const { addUser, getUser, removeUser, getUsersInRoom } = require('./users.js')

const port = process.env.PORT || 5000
const hostname = 'localhost'

corsOption = {
  cors: true,
  origin: ['http://localhost:5000'],
}

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socket(server, corsOption)

//  .on means its listening for event from the frontend
//  .emit means its emitting data for the frond end to listen for

io.on('connection', (socket) => {
  console.log('Starting chat on DevCircle platform')

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to this chatroom ${user.room}`
    })

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name}  has joined` })

    socket.join(user.room)

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit('message', { user: user.name, text: message })
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} left`
      })
    }
  })
})

app.use(router)

server.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}`)
})
