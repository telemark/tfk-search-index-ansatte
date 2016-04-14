'use strict'

var Wreck = require('wreck')
var config = require('./config')
var addIndex = require('./lib/add-index')
var deleteIndex = require('./lib/delete-index')
var repackEmployee = require('./lib/repack-employee')
var wreckOptions = {
  json: true
}

function indexEmployees (results) {
  var list = JSON.parse(JSON.stringify(results))

  function next () {
    if (list.length > 0) {
      var employee = list.pop()
      var content = repackEmployee(employee)

      addIndex(content, function (err, payload) {
        if (err) {
          console.error(err)
        } else {
          console.log(payload)
          next()
        }
      })
    } else {
      console.log('Finished indexing')
    }
  }

  next()
}

function handleEmployees (error, repsonse, payload) {
  if (error) {
    console.error(error)
  } else {
    indexEmployees(payload.results)
  }
}

deleteIndex(function (error, payload) {
  if (error) {
    console.error(error)
  } else {
    console.log(payload)
    Wreck.get(config.SOURCE_URL, wreckOptions, handleEmployees)
  }
})
