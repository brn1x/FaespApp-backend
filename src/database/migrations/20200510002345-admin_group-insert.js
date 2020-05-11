'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admin_groups', [{
      init_create_date: new Date(Date.now()),
      end_create_date: new Date(Date.now()),
      init_subscription_date: new Date(Date.now()),
      end_subscription_date: new Date(Date.now()),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin_groups', null, {})
  }
}
