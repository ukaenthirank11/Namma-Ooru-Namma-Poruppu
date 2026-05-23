const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const root = __dirname
const port = Number(process.env.PORT || 4173)

const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

http
  .createServer((request, response) => {
    const urlPath = decodeURIComponent(new URL(request.url || '/', `http://127.0.0.1:${port}`).pathname)
    const requestedPath = urlPath === '/' ? 'index.html' : urlPath.replace(/^[/\\]+/, '')
    const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, '')
    const filePath = path.join(root, safePath)

    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.writeHead(404, { 'Content-Type': 'text/plain' })
        response.end('Not found')
        return
      }

      response.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'text/plain' })
      response.end(content)
    })
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`Plastic awareness website running at http://127.0.0.1:${port}/`)
  })
