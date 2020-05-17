const { Model, DataTypes } = require('sequelize')

class Log extends Model {
  static init (sequelize) {
    super.init({
      log: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'admin' })
  }
}

module.exports = Log
