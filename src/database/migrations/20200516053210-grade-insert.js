'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('grades', [{
      agm1: 10,
      agm2: 10,
      tb1: 10,
      tb2: 10,
      student_id: 1,
      subject_id: 1,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('grades', null, {})
  }
}
