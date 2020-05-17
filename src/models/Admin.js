const { Model, DataTypes } = require('sequelize')

class Admin extends Model {
  static init (sequelize) {
    super.init({
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      access_level: DataTypes.INTEGER,
      status: DataTypes.STRING(1)
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.hasMany(models.Log, { foreignKey: 'admin_id', as: 'logs' })
  }
}

module.exports = Admin
