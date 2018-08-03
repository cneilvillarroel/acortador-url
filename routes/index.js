'use strict'

const express = require('express')
const urlController = require('../controllers/url')
const api = express.Router()

api.get('/url', urlController.getUrls)
api.get('/:short', urlController.getUrl)
api.post('/url', urlController.saveUrl)
api.delete('/url/:id', urlController.deleteUrl)

module.exports = api
