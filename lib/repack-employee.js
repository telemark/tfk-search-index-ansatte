const buildDescription = require('./build-description')

module.exports = data => {
  if (!data) {
    throw new Error('Missing required input')
  }

  const info = {
    title: data.givenName + ' ' + data.familyName,
    description: buildDescription(data),
    url: `${process.env.SITE_URL}/ansatte/#/ansatt/${data.personId}`
  }

  return Object.assign({}, info, data)
}
