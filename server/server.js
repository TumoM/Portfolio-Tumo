const express = require('express')
// let { Request, Response, NextFunction } = require('express');
const next = require('next');


const example = require('./routes/example')
const posts = require('./routes/posts');
// const login = require('./routes/auth');


const port = process.env.PORT || 3001
const dev = process.env.NODE_ENV !== 'production'
const server = next({
      dev
})
const handle = server.getRequestHandler()
const apiString = process.env.API_STRING || "/api/v1/"

console.log("Preparing Server");

server.prepare().then(() => {

      const app = express()
      app.use(`${apiString}example`, example)
      app.use(`${apiString}posts`, posts)
      // app.use(`${apiString}login`, login)


      // app.get('/api/example', function (req, res) {
      //   res.send('api working!!!')
      // })

      app.all('*', (req, res) => {
            return (handle(req, res))
      })

      app.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
      })
})