'use strict'

const axios = require('axios')
const generateToken = require('../lib/generate-token')
const config = require('../config')
const indexUrl = config.SEARCH_SERVICE_URL + '/' + config.SEARCH_SERVICE_INDEX + '/' + config.SEARCH_SERVICE_INDEX_TYPE

module.exports = async payload => {
  const token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-search-index-ansatte'}})
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  if (!payload) {
    throw new Error('Missing required input: payload')
  }
  const { data } = await axios.post(indexUrl, payload)
  return data
}
