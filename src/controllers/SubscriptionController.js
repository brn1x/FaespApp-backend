const Group = require('../models/Group')
const Student = require('../models/Student')

const validateSubscriptionDate = require('../utils/validateSubscriptionDate')

module.exports = {
  async index (req, res) {
    const ra = req.headers['x-logged-user']

    const student = await Student.findOne({
      where: { ra },
      include: [{
        association: 'groups',
        attributes: ['id', 'name', 'description', 'qtt_max_students'],
        through: { attributes: [] }
      }]
    })

    if (student.groups.length === 0) {
      return res.status(204).send()
    }

    return res.json(student)
  },

  async subscribe (req, res) {
    validateSubscriptionDate()
      .then(async response => {
        if (response === true) {
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
        } else {
          return res.status(405).send({
            statusCode: 405,
            error: 'Method not allowed'
          })
        }
      })
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
