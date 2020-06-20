const Group = require('../models/Group')
const LogController = require('../controllers/LogController')

module.exports = {
  async accept (req, res) {
    const { id } = req.params

    const group = await Group.findByPk(id)

    group.update({
      status: 'A'
    })

    const adminLogin = req.headers['x-logged-user']
    await LogController.store(`Group "${group.name.toUpperCase()}" accepted`, adminLogin)

    return res.json(group)
  },

  async decline (req, res) {
    const { id } = req.params

    const group = await Group.findByPk(id)

    group.update({
      status: 'R'
    })

    const adminLogin = req.headers['x-logged-user']
    await LogController.store(`Group "${group.name.toUpperCase()}" refused`, adminLogin)

    return res.json(group)
  },

  async index (req, res) {
    const groups = await Group.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'ra_group_owner',
        'qtt_min_students',
        'qtt_max_students',
        'qtt_meetings',
        'period',
        'status'
      ],
      where: { status: 'P' },
      include: [
        { association: 'campus', attributes: ['name'], where: { status: 'A' } },
        { association: 'semester', attributes: ['name'], where: { status: 'A' } },
        { association: 'category', attributes: ['name'], where: { status: 'A' } },
        { association: 'students', attributes: ['name'] }
      ],
      order: ['id']
    })

    return res.json(groups)
  }
}
