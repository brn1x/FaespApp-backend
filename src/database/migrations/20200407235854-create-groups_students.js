'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups_students', {
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'groups', key: 'id' }
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'students', key: 'id' }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('groups_students')
  }
}
