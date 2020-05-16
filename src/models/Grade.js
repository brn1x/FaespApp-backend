const { Model, DataTypes } = require('sequelize')

class Grade extends Model {
  static init (sequelize) {
    super.init({
      agm1: DataTypes.INTEGER,
      agm2: DataTypes.INTEGER,
      tb1: DataTypes.INTEGER,
      tb2: DataTypes.INTEGER
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' })
    this.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' })
  }
}

module.exports = Grade
