'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('config_dates', {
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
      status: {
        type: Sequelize.STRING(1),
        defaultValue: 'A'
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
    return queryInterface.dropTable('config_dates')
  }
}
