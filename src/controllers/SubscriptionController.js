const Group = require('../models/Group')
const Student = require('../models/Student')

module.exports = {
  async subscribe (req, res) {
    const { ra } = req.body
    const { id } = req.params

    const student = await Student.findOne({ where: { ra } })
    const group = await Group.findByPk(id)

    if (!student || !group) {
      return res.status(404).json({
        status: 404,
        error: 'Content not found'
      })
    }

    await student.addGroups(group)

    return res.json(group)
  },

  async unsubscribe (req, res) {
    const { ra } = req.body
    const { id } = req.params

    const student = await Student.findOne({ where: { ra } })
    const group = await Group.findByPk(id)

    if (!student || !group) {
      return res.status(404).json({
        status: 404,
        error: 'Content not found'
      })
    }

    await student.removeGroups(group)

    return res.status(204).send()
  }
}
