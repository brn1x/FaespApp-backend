'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subjects', [{
      name: 'Fixed Subject',
      qtt_classes: 15,
      course_id: 1,
      status: true,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subjects', null, {})
  }
}
