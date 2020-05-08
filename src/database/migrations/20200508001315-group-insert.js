'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('groups', [{
      name: 'Group fixed',
      description: 'Test fixed',
      category_id: 1,
      ra_group_owner: '12345678900',
      qtt_min_students: 0,
      qtt_max_students: 0,
      qtt_meetings: 10,
      campus_id: 1,
      semester_id: 1,
      period: 'N',
      status: 'A',
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {})
  }
}
