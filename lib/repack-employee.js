const buildDescription = require('./build-description')

module.exports = data => {
  if (!data) {
    throw new Error('Missing required input')
  }

  return {
    title: data.givenName + ' ' + data.familyName,
    description: buildDescription(data),
    url: `${process.env.SITE_URL}/ansatte/#/ansatt/${data.personId}`,
    data: data
  }
}
