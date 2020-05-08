'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('students', [{
      ra: '00000000000',
      password: 'fixed',
      name: 'Student fixed',
      status: 'A',
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('students', null, {})
  }
}
