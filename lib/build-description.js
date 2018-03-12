module.exports = data => {
  if (!data) {
    throw new Error('Missing required input')
  }

  let content = []

  content.push(data.givenName + ' ' + data.familyName)

  content.push(data.positions[0].departmentName)

  if (data.workPhone && data.workPhone.length > 0) {
    content.push('Telefon: ' + data.workPhone)
  }

  if (data.mobilePhone && data.mobilePhone.length > 0) {
    content.push('Mobil: ' + data.mobilePhone)
  }

  if (data.email && data.email.length > 0) {
    content.push('E-post: ' + data.email)
  }

  return content.join(', ')
}
