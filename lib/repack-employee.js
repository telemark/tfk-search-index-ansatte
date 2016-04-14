'use strict'

var config = require('../config')
var buildDescription = require('./build-description')

function repackEmployee (data) {
  if (!data) {
    throw new Error('Missing required input')
  }

  var json = {
    title: data.givenName + ' ' + data.familyName,
    description: buildDescription(data),
    url: config.SITE_URL + '/' + data.personId,
    data: data
  }

  return json
}

module.exports = repackEmployee
