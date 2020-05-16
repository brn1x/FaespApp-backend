'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grades', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      agm1: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      agm2: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      tb1: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      tb2: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'students', key: 'id' }
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'subjects', key: 'id' }
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
    return queryInterface.dropTable('grades')
  }
}
