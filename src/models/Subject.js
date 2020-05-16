const { Model, DataTypes } = require('sequelize')

class Subject extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      qtt_classes: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' })
    this.hasOne(models.Grade, { foreignKey: 'subject_id', as: 'grades' })
  }
}

module.exports = Subject