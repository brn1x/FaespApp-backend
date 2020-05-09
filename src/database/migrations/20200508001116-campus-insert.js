'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('campus', [{
      name: 'Campus fixed',
      status: 'A',
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('campus', null, {})
  }
}
