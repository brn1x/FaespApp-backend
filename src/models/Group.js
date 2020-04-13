const { Model, DataTypes } = require('sequelize')

class Group extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      qtt_min_students: DataTypes.INTEGER,
      qtt_max_students: DataTypes.INTEGER,
      qtt_meetings: DataTypes.INTEGER
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsToMany(models.Student, { foreignKey: 'group_id', through: 'groups_students', as: 'students' })
  }
}

module.exports = Group
