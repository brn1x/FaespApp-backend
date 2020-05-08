const { Model, DataTypes } = require('sequelize')

class Semester extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      status: DataTypes.STRING(1)
    }, {
      sequelize
    })
  }
}

module.exports = Semester
