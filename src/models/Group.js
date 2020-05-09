const { Model, DataTypes } = require('sequelize')

class Group extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      ra_group_owner: DataTypes.STRING,
      qtt_min_students: DataTypes.INTEGER,
      qtt_max_students: DataTypes.INTEGER,
      qtt_meetings: DataTypes.INTEGER,
      period: DataTypes.STRING(1),
      status: DataTypes.STRING(1)
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsToMany(models.Student, { foreignKey: 'group_id', through: 'groups_students', as: 'students' })
    this.belongsTo(models.Campus, { foreignKey: 'campus_id', as: 'campus' })
    this.belongsTo(models.Semester, { foreignKey: 'semester_id', as: 'semester' })
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' })
  }
}

module.exports = Group
