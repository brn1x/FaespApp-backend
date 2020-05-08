const { Model, DataTypes } = require('sequelize')

class Category extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      status: DataTypes.STRING(1)
    }, {
      tableName: 'categories',
      sequelize
    })
  }
}

module.exports = Category
