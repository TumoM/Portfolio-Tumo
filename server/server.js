const express = require('express')
// let { Request, Response, NextFunction } = require('express');
const next = require('next');
const example = require('./routes/example')
const posts = require('./routes/posts'); 

const port = process.env.PORT || 3001
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()
const apiString = process.env.API_STRING || "/api/v1/" 

console.log("Preparing Server");

server.prepare().then(() => {

  const app = express()
  app.use(`${apiString}example`, example)
  console.log("Calling Post API routes");
  app.use(`${apiString}posts`, posts)

  // app.get('/api/example', function (req, res) {
  //   res.send('api working!!!')
  // })

  app.all('/api/', (req, res) => {
        res.send("Specify api version")
  })
  app.all('/api\/*/', (req, res) => {
        res.send("Reached unspecified api path")
  })

  app.all('*', (req, res) => {
        return (handle(req, res) 
  )})

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

