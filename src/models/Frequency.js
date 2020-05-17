const { Model, DataTypes } = require('sequelize')

class Frequency extends Model {
  static init (sequelize) {
    super.init({
      class_date: DataTypes.DATEONLY,
      lack: DataTypes.BOOLEAN,
      status: DataTypes.STRING(1)
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' })
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' })
  }
}

module.exports = Frequency
