const axios = require('axios')
const path = require('path')
const addIndex = require('./lib/add-index')
const deleteIndex = require('./lib/delete-index')
const repackEmployee = require('./lib/repack-employee')
const prepareForIndex = require('./lib/prepare-for-index')
const logger = require('./lib/logger')
const env = process.argv[2]

if (env) {
  const envFilePath = path.resolve(process.cwd(), env)
  logger('info', ['index', 'loading environment', env])
  require('dotenv').config({path: envFilePath})
} else {
  logger('warn', ['index', 'no environment loaded'])
}

async function indexAnsatte () {
  const { data } = await axios.get(process.env.SOURCE_URL)
  const msg = await deleteIndex()
  logger('info', ['index', 'indexAnsatte', 'index deleted', JSON.stringify(msg)])
  const indexes = data.results.map(repackEmployee).map(prepareForIndex)
  logger('info', ['index', 'index-ansatte', 'employees to index', indexes.length])
  let jobs = indexes.map(addIndex)
  let todo = indexes.length
  let done = 0
  let success = 0
  let fail = 0
  const next = async () => {
    if (done === todo) {
      logger('info', ['index', 'indexAnsatte', 'finished', 'success', success, 'fail', fail])
    } else {
      done++
      const job = jobs.pop()
      try {
        await job
        success++
      } catch (error) {
        fail++
        logger('error', ['index', 'indexAnsatte', error])
      }
      await next()
    }
  }
  await next()
}

indexAnsatte()
