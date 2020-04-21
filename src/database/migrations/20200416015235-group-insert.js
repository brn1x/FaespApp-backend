'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('groups', [{
      name: 'Group fixed',
      description: 'Test fixed',
      category: 'Test fixed',
      ra_group_owner: '12345678900',
      qtt_min_students: 0,
      qtt_max_students: 0,
      qtt_meetings: 10,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {})
  }
}
