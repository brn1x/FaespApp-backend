const { Model, DataTypes } = require('sequelize')

class Student extends Model {
  static init (sequelize) {
    super.init({
      ra: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsToMany(models.Group, { foreignKey: 'student_id', through: 'groups_students', as: 'groups' })
    this.belongsToMany(models.Subject, { foreignKey: 'student_id', through: 'students_subjects', as: 'subjects' })
    this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' })
  }
}

module.exports = Student
