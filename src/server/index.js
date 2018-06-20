import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'

import App from '../shared/App.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use('/build', express.static(path.join(__dirname, 'build'), {fallthrough: false}))

app.get('/', (req, res) => {
  let app = ReactDOMServer.renderToString(<App />)
  let indexFile = path.resolve('./public/index.html')
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong: ', err)
      return res.status(500).send('Oops!')
    }
    console.log('hello')
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    )
  })
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
