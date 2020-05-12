'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admins', [{
      login: 'admin',
      password: 'faespappQAS',
      access_level: 3,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {})
  }
}
