'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      qtt_min_students: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      qtt_max_students: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      qtt_meetings: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('groups')
  }
}
