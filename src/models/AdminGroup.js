const { Model, DataTypes } = require('sequelize')

class AdminGroup extends Model {
  static init (sequelize) {
    super.init({
      init_create_date: DataTypes.DATE,
      end_create_date: DataTypes.DATE,
      init_subscription_date: DataTypes.DATE,
      end_subscription_date: DataTypes.DATE
    }, {
      sequelize
    })
  }
}

module.exports = AdminGroup
