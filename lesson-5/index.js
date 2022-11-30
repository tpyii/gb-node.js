const http = require('http')
const fs = require('fs').promises
const path = require('path')
const port = process.env.PORT || 3000
const host = 'localhost'

const getTemplate = (data) => {
  return `
    <tr>
      <td>${data.type ?? ''}</td>
      <td><a href="${data.href}">${data.name}</a></td>
      <td>${data.time ?? ''}</td>
      <td>${data.size ?? ''}</td>
      <td></td>
    </tr>
  `
}

const getDirectoryListTemplate = async (directoryPath, requestUrl) => {
  const list = await fs.readdir(directoryPath)
  const data = await Promise.all(
    list.map(async (item) => {
      const stat = await fs.stat(path.join(directoryPath, item))
      const href = `${requestUrl}${requestUrl === '/' ? '' : '/'}${item}`
      const type = stat.isDirectory() ? '📁' : '📄'
      const time = new Date(stat.atime).toLocaleString()

      return getTemplate({
        type,
        href,
        name: item,
        time,
        size: stat.size
      })
    })
  )

  if (requestUrl !== '/') {
    const href = requestUrl.split('/').slice(0, -1).join('/')
    const parentDirectory = getTemplate({
      type: '🔙',
      href: href === '' ? '/' : href,
      name: 'Parent directory'
    })

    data.unshift(parentDirectory)
  }

  return data.join('')
}

const requestListener = async (request, response) => {
  try {
    const fullPath = path.join(__dirname, request.url)
    const stat = await fs.stat(fullPath)
    const filePath = stat.isDirectory() ? path.join(__dirname, 'index.html') : fullPath
    let data = await fs.readFile(filePath)

    if (stat.isDirectory()) {
      const list = await getDirectoryListTemplate(fullPath, request.url)
      
      data = data.toString()
        .replaceAll('{path}', request.url)
        .replace('{list}', list)
    }

    response.writeHead(200)
    response.end(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      response.writeHead(404)
    }

    console.log(error)
  } finally {
    response.end()
  }
}

const server = http.createServer(requestListener)

server.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`)
})

server.on('error', (error) => {
  console.log(error)
})
