const path = require('path')
const fs = require('fs')

const method = {
  get(request, response) {
    const file = request.url === '/' ? 'index.html' : request.url
    const filePath = path.join(__dirname, file)

    if (!fs.existsSync(filePath)) {
      response.writeHead(404)
      response.end()
    } else {
      readStream = fs.createReadStream(filePath)
      readStream.pipe(response)
    }
  },
  post(request, response) {
    let data = ''
  
    request.on('data', (chunk) => {
      data += chunk
    })

    request.on('end', () => {
      const parsedData = JSON.parse(data)

      console.log(parsedData)
      response.writeHead(200, { 'Content-Type': 'json'})
      response.end(data)
    })
  }
}

module.exports = function requestListener(request, response) {
  if (request.method === 'GET') {
    method.get(request, response)
  } else if (request.method === 'POST') {
    method.post(request, response)
  } else {
    response.statusCode = 405
    response.end()
  }
}
