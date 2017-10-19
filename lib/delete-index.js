'use strict'

const axios = require('axios')
const generateToken = require('../lib/generate-token')
const config = require('../config')
const indexUrl = config.SEARCH_SERVICE_URL + '/' + config.SEARCH_SERVICE_INDEX

module.export = async () => {
  const token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-search-index-ansatte'}})
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const { data } = await axios.delete(indexUrl)
  return data
}
