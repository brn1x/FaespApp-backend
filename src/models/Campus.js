const { Model, DataTypes } = require('sequelize')

class Campus extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      status: DataTypes.STRING(1)
    }, {
      tableName: 'campus',
      sequelize
    })
  }
}

module.exports = Campus
