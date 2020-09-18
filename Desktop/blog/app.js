const http = require('http')

const app = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('hello world')
})

const PORT = 3003
app.listen(PORT)
console.log(`Server running on ${PORT}`);