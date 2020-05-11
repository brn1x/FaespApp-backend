const AdminGroup = require('../models/AdminGroup')

async function validateCreateDate () {
  const date = await AdminGroup.findOne({
    order: [['id', 'DESC']]
  })

  const today = new Date().setHours(0, 0, 0, 0)
  const initCreateDate = new Date(date.init_create_date).setMilliseconds(10800000)
  const endCreateDate = new Date(date.end_create_date).setMilliseconds(10800000)

  if (today >= initCreateDate &&
      today <= endCreateDate) {
    return true
  }

  return false
}

module.exports = validateCreateDate
