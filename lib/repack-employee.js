'use strict'

const config = require('../config')
const buildDescription = require('./build-description')

module.exports = data => {
  if (!data) {
    throw new Error('Missing required input')
  }

  return {
    title: data.givenName + ' ' + data.familyName,
    description: buildDescription(data),
    url: config.SITE_URL + '/' + data.personId,
    data: data
  }
}
