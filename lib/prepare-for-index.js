const uuid = require('uuid/v4')

module.exports = post => {
  return {
    index: process.env.SEARCH_INDEX,
    type: process.env.SEARCH_INDEX_TYPE,
    id: uuid(),
    body: post
  }
}
