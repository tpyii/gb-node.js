const { createServer } = require('http')
const { Server } = require('socket.io')
const requestListener = require('./server')

const httpServer = createServer(requestListener)
const io = new Server(httpServer)

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`)

  socket.on('disconnect', (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);

    socket.broadcast.emit('server', {
      id: 'Server',
      message: `The client ${socket.id} disconnected`,
    })
  })

  socket.on('client', (data) => {
    socket.broadcast.emit('server', {
      id: data.id,
      message: data.message.split('').reverse().join(''),
    })
  })

  socket.broadcast.emit('server', {
    id: 'Server',
    message: `The new client ${socket.id} connected`,
  })
})

httpServer.listen(3000)
