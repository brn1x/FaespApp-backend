const ConfigDate = require('../models/ConfigDate')

async function validateSubscriptionDate () {
  const date = await ConfigDate.findOne({
    order: [['id', 'DESC']]
  })

  const today = new Date().setHours(0, 0, 0, 0)
  const initSubscriptionDate = new Date(date.init_subscription_date).setMilliseconds(10800000)
  const endSubscriptionDate = new Date(date.end_subscription_date).setMilliseconds(10800000)

  if (today >= initSubscriptionDate &&
      today <= endSubscriptionDate) {
    return true
  }

  return false
}

module.exports = validateSubscriptionDate
