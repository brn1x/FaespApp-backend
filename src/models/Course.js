const { Model, DataTypes } = require('sequelize')

class Course extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      status: DataTypes.STRING(1)
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.hasMany(models.Subject, { foreignKey: 'course_id', as: 'subjects' })
    this.hasMany(models.Student, { foreignKey: 'course_id', as: 'students' })
  }
}

module.exports = Course
