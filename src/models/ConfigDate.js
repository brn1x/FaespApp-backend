const { Model, DataTypes } = require('sequelize')

class ConfigDate extends Model {
  static init (sequelize) {
    super.init({
      init_create_date: DataTypes.DATE,
      end_create_date: DataTypes.DATE,
      init_subscription_date: DataTypes.DATE,
      end_subscription_date: DataTypes.DATE,
      status: DataTypes.STRING(1)
    }, {
      sequelize
    })
  }
}

module.exports = ConfigDate
