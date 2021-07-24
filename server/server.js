const express = require('express')
const next = require('next')
var example = require('./routes/example')

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()

server.prepare().then(() => {
  const app = express()
  app.use('/api/example', example)

  // app.get('/api/example', function (req, res) {
  //   res.send('api working!!!')
  // })

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})