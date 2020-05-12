const { Model, DataTypes } = require('sequelize')

class Admin extends Model {
  static init (sequelize) {
    super.init({
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      access_level: DataTypes.INTEGER
    }, {
      sequelize
    })
  }
}

module.exports = Admin
