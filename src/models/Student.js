const { Model, DataTypes } = require('sequelize')

class Student extends Model {
  static init (sequelize) {
    super.init({
      ra: DataTypes.STRING,
      name: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsToMany(models.Group, { foreignKey: 'student_id', through: 'groups_students', as: 'groups' })
  }
}

module.exports = Student
