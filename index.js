'use strict'

const axios = require('axios')
const config = require('./config')
const addIndex = require('./lib/add-index')
const deleteIndex = require('./lib/delete-index')
const repackEmployee = require('./lib/repack-employee')

async function indexAnsatte () {
  const msg = await deleteIndex
  console.log(msg)
  const { data } = axios.get(config.SOURCE_URL)
  const employees = data.results.map(repackEmployee)
  const jobs = employees.map(addIndex)
  await Promise.all(jobs)
  console.log('Finished indexing')
  process.exit(0)
}

indexAnsatte()
