'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('config_dates', [{
      init_create_date: '2020-01-01',
      end_create_date: '2025-12-12',
      init_subscription_date: '2020-01-01',
      end_subscription_date: '2025-12-12',
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('config_dates', null, {})
  }
}
