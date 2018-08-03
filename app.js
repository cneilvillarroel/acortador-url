'use strict'

/* Configuración de Express */
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'public/dist/public')))

app.use('/', api)

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/public/index.html'))
})

module.exports = app