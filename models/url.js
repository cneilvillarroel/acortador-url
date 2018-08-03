'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UrlSchema = Schema({
  short: String,
  prettyUrl: String,
  original: String,
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Url', UrlSchema)