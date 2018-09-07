const axios = require('axios')
const path = require('path')
const sleep = require('then-sleep')
const addIndex = require('./lib/add-index')
const deleteIndex = require('./lib/delete-index')
const repackEmployee = require('./lib/repack-employee')
const prepareForIndex = require('./lib/prepare-for-index')
const logger = require('./lib/logger')
const env = process.argv[2]

if (env) {
  const envFilePath = path.resolve(process.cwd(), env)
  logger('info', ['index', 'loading environment', env])
  require('dotenv').config({ path: envFilePath })
} else if (process.env.NODE_ENV !== 'production') {
  logger('info', ['index', 'loading environment', '.env'])
  require('dotenv').config()
} else {
  logger('warn', ['index', 'no environment loaded'])
}

async function indexAnsatte () {
  const { data } = await axios.get(process.env.SOURCE_URL)
  if (!process.env.NO_DELETE_INDEX) {
    const msg = await deleteIndex()
    logger('info', ['index', 'indexAnsatte', 'index deleted', JSON.stringify(msg)])
  } else {
    logger('info', ['index', 'indexAnsatte', 'no delete index'])
  }
  const indexes = data.results.map(repackEmployee).map(prepareForIndex)
  logger('info', ['index', 'index-ansatte', 'employees to index', indexes.length])
  let success = 0
  let fail = 0
  const next = async () => {
    if (indexes.length === 0) {
      logger('info', ['index', 'indexAnsatte', 'finished', 'success', success, 'fail', fail])
    } else {
      const index = indexes.pop()
      try {
        await addIndex(index)
        success++
      } catch (error) {
        fail++
        logger('error', ['index', 'indexAnsatte', error])
      }
      await sleep(100)
      await next()
    }
  }
  await next()
}

indexAnsatte()
