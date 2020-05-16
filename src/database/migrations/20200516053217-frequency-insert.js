'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('frequencies', [{
      subject_id: 1,
      student_id: 1,
      class_date: '2020-05-05',
      lack: true,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('frequencies', null, {})
  }
}
