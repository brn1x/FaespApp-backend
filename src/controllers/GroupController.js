const Group = require('../models/Group')

module.exports = {
  async index (req, res) {
    const groups = await Group.findAll({
      attributes: ['id', 'name', 'description', 'category', 'ra_group_owner', 'qtt_min_students', 'qtt_max_students', 'qtt_meetings', 'status'],
      where: { status: 'A' },
      include: { association: 'students', attributes: ['name'] }
    })

    return res.json(groups)
  },

  async findById (req, res) {
    const { id } = req.params

    const group = await Group.findByPk(id)

    if (!group) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(group)
  },

  async store (req, res) {
    const {
      name,
      description,
      category,
      ra_group_owner,
      qtt_min_students,
      qtt_max_students,
      qtt_meetings
    } = req.body

    const group = await Group.create({
      name,
      description,
      category,
      ra_group_owner,
      qtt_min_students,
      qtt_max_students,
      qtt_meetings
    })

    return res.json(group)
  },

  async update (req, res) {
    const { id } = req.params

    const {
      name,
      description,
      category,
      ra_group_owner,
      qtt_min_students,
      qtt_max_students,
      qtt_meetings
    } = req.body

    const updatedGroup = {
      name,
      description,
      category,
      ra_group_owner,
      qtt_min_students,
      qtt_max_students,
      qtt_meetings
    }

    const group = await Group.findByPk(id)

    if (!group) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await Group.update(updatedGroup, { where: { id: id } })

    updatedGroup.id = id
    return res.json(updatedGroup)
  },

  async delete (req, res) {
    const { id } = req.params

    const group = await Group.findByPk(id)

    if (!group) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await group.destroy()

    return res.status(204).send()
  }
}
