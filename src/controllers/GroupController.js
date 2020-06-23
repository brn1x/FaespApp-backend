const Group = require('../models/Group')
const Semester = require('../models/Semester')
const { Op } = require('sequelize')

const validateCreateDate = require('../utils/validateCreateDate')

module.exports = {
  async index (req, res) {
    const studentRA = req.headers['x-logged-user']

    if (!studentRA) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized'
      })
    }

    const studentGroups = await Group.findAll({
      attributes: ['id'],
      include: [{
        association: 'students',
        where: { ra: studentRA },
        attributes: []
      }]
    })

    const groups = await Group.findAll({
      attributes: ['id'],
      include: [{
        association: 'students',
        attributes: []
      }]
    })

    const filteredGroupsId = groups.filter(x => {
      return studentGroups.filter(y => {
        return x.id === y.id
      }).length === 0
    }).map(x => { return x.id })

    const filteredGroups = await Group.findAll({
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
      where: {
        status: 'A',
        id: {
          [Op.in]: filteredGroupsId
        }
      },
      include: [
        {
          association: 'campus',
          attributes: ['id', 'name'],
          where: { status: 'A' }
        },
        {
          association: 'semester',
          attributes: ['id', 'name']
        },
        {
          association: 'category',
          attributes: ['id', 'name'],
          where: { status: 'A' }
        },
        {
          association: 'students',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ],
      order: ['id']
    })

    return res.json(filteredGroups)
  },

  async allGroups (req, res) {
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
      where: { status: 'A' },
      include: [
        {
          association: 'campus',
          attributes: ['id', 'name'],
          where: { status: 'A' }
        },
        {
          association: 'semester',
          attributes: ['id', 'name']
        },
        {
          association: 'category',
          attributes: ['id', 'name'],
          where: { status: 'A' }
        },
        {
          association: 'students',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ],
      order: ['id']
    })

    return res.json(groups)
  },

  async findById (req, res) {
    const { id } = req.params

    const group = await Group.findOne({
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
      include: [
        { association: 'campus', attributes: ['id', 'name'], where: { status: 'A' } },
        { association: 'semester', attributes: ['id', 'name'] },
        { association: 'category', attributes: ['id', 'name'], where: { status: 'A' } },
        { association: 'students', attributes: ['id', 'name'], through: { attributes: [] } }
      ],
      where: { id, status: 'A' }
    })

    if (!group) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(group)
  },

  async store (req, res) {
    validateCreateDate()
      .then(async response => {
        if (response === true) {
          const {
            name,
            description,
            category_id,
            qtt_min_students,
            qtt_max_students,
            qtt_meetings,
            campus_id,
            period,
            status = 'P'
          } = req.body

          const semester = await Semester.findOne({
            order: [['id', 'DESC']],
            where: { status: 'A' }
          })
          const ra_group_owner = req.headers['x-logged-user'] || req.body.ra_group_owner

          const group = await Group.create({
            name,
            description,
            category_id,
            ra_group_owner,
            qtt_min_students,
            qtt_max_students,
            qtt_meetings,
            campus_id,
            semester_id: semester.id,
            period,
            status
          })

          return res.json(group)
        } else {
          return res.status(405).send({
            statusCode: 405,
            error: 'Method not allowed'
          })
        }
      })
  },

  async update (req, res) {
    const { id } = req.params

    const {
      name,
      description,
      category_id,
      ra_group_owner,
      qtt_min_students,
      qtt_max_students,
      qtt_meetings,
      campus_id,
      semester_id,
      period
    } = req.body

    const group = await Group.findByPk(id,
      {
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
        include: [
          { association: 'campus', attributes: ['id', 'name'], where: { status: 'A' } },
          { association: 'semester', attributes: ['id', 'name'] },
          { association: 'category', attributes: ['id', 'name'], where: { status: 'A' } },
          { association: 'students', attributes: ['id', 'name'] }
        ],
        where: { id, status: 'A' }
      }
    )

    if (!group) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await group.update({
      name,
      description,
      category_id,
      ra_group_owner,
      qtt_min_students,
      qtt_max_students,
      qtt_meetings,
      campus_id,
      semester_id,
      period
    })

    return res.json(group)
  },

  async delete (req, res) {
    const { id } = req.params

    const group = await Group.findOne({ where: { id, status: 'A' } })

    if (!group) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await group.update({ status: 'I' })

    return res.status(204).send()
  }
}
