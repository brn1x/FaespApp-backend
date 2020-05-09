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
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' }
      },
      ra_group_owner: {
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
      campus_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'campus', key: 'id' }
      },
      semester_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'semesters', key: 'id' }
      },
      period: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(1),
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
