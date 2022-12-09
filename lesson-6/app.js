const socket = io('localhost:3000')
const messages = document.getElementById('messages')
const send = document.getElementById('send')
const input = document.getElementById('input')

const addMessage = (data) => {
  const li = document.createElement('li')
  
  li.textContent = `${data.id}: ${data.message}`
  messages.append(li)
}

socket.on('connect', () => {
  console.log('Successful connected to server')
})

socket.on('server', (data) => {
  addMessage(data)
})

send.addEventListener('click', () => {
  socket.emit('client', {
    id: socket.id,
    message: input.value,
  })

  addMessage({
    id: socket.id,
    message: input.value,
  })
  
  input.value = ''
})
