const Group = require('../models/Group')
const Student = require('../models/Student')
const LogController = require('../controllers/LogController')
const axios = require('axios')

module.exports = {
  async accept (req, res) {
    const { id } = req.params

    const group = await Group.findByPk(id)

    await group.update({
      status: 'A'
    })

    const adminLogin = req.headers['x-logged-user']
    await LogController.store(`Group "${group.name.toUpperCase()}" accepted`, adminLogin)

    const student = await Student.findOne({ where: { ra: group.dataValues.ra_group_owner } })

    await student.addGroups(group)

    const data = {
      to: student.dataValues.token,
      sound: 'default',
      title: 'Requisição de Grupo Aceita!',
      body: `Grupo ${group.dataValues.name} foi aprovado!`,
      data: {
        data: `Grupo ${group.dataValues.name} criado!`
      },
      _displayInForeground: true
    }

    await axios.default.post('https://exp.host/--/api/v2/push/send', data)

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

    const student = await Student.findOne({ where: { ra: group.dataValues.ra_group_owner } })

    const data = {
      to: student.dataValues.token,
      sound: 'default',
      title: 'Requisição de Grupo Reprovada!',
      body: `Grupo ${group.dataValues.name} foi reprovado!`,
      data: {
        data: `Grupo ${group.dataValues.name} foi reprovado!`
      },
      _displayInForeground: true
    }

    await axios.default.post('https://exp.host/--/api/v2/push/send', data)

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
