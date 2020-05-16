const { Model, DataTypes } = require('sequelize')

class ConfigDate extends Model {
  static init (sequelize) {
    super.init({
      init_create_date: DataTypes.DATEONLY,
      end_create_date: DataTypes.DATEONLY,
      init_subscription_date: DataTypes.DATEONLY,
      end_subscription_date: DataTypes.DATEONLY
    }, {
      sequelize
    })
  }
}

module.exports = ConfigDate