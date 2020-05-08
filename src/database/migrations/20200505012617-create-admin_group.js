'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('admin_groups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      init_create_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_create_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      init_subscription_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_subscription_date: {
        type: Sequelize.DATEONLY,
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
    return queryInterface.dropTable('admin_groups')
  }
}
