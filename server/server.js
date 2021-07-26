const express = require('express')
require('dotenv').config()

// let { Request, Response, NextFunction } = require('express');
const next = require('next');

const { connect } = require('./db')
const example = require('./routes/example')
const postsRoutes = require('./routes/posts');
const portfoliosRoutes = require('./routes/portfolios');

const port = process.env.PORT || 3001
const dev = process.env.NODE_ENV !== 'production'
const server = next({
      dev
})
const handle = server.getRequestHandler()
const apiString = process.env.API_STRING || "/api/v1/"

async function runServer() {
      await require('./db').connect()
      try{
            console.log("Preparing Server");

            server.prepare().then(() => {
                  console.log("Prepared Server");
      
                  const app = express()
                  app.use(`${apiString}example`, example)
                  app.use(`${apiString}posts`, postsRoutes)
                  app.use(`${apiString}portfolios`, portfoliosRoutes)
      
      
                  app.all('*', (req, res) => {
                        return (handle(req, res))
                  })
      
                  app.listen(port, (err) => {
                        if (err) throw err
                        console.log(`> Ready on http://localhost:${port}`)
                  })
            })
      }
      catch(err){
            console.log(err)
      console.log('Failed to connect to Db')
      }
}

try{
      runServer()
}
catch(err) {
      console.log("Error!!!:",err);
}
