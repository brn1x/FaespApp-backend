const Group = require('../models/Group')

module.exports = {
  async accept (req, res) {
    const { id } = req.params

    const group = await Group.findByPk(id)

    group.update({
      status: 'A'
    })

    return res.json(group)
  },

  async decline (req, res) {
    const { id } = req.params

    const group = await Group.findByPk(id)

    group.update({
      status: 'R'
    })

    return res.json(group)
  },

  async index (req, res) {
    const groups = await Group.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'category',
        'ra_group_owner',
        'qtt_min_students',
        'qtt_max_students',
        'qtt_meetings',
        'campus',
        'semester_year',
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
