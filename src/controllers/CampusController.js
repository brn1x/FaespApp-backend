const Campus = require('../models/Campus')

module.exports = {
  async store (req, res) {
    const { name } = req.body

    const campus = await Campus.create({ name })

    return res.json(campus)
  },

  async index (req, res) {
    const campus = await Campus.findAll({
      where: { status: 'A' }
    })

    return res.json(campus)
  },

  async findById (req, res) {
    const { id } = req.params

    const campus = await Campus.findOne({ where: { id, status: 'A' } })

    if (!campus) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(campus)
  },

  async update (req, res) {
    const { id } = req.params

    const campus = await Campus.findOne({ where: { id, status: 'A' } })

    if (!campus) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    const { name } = req.body

    await campus.update({ name })

    return res.json(campus)
  },

  async delete (req, res) {
    const { id } = req.params

    const campus = await Campus.findOne({ where: { id, status: 'A' } })

    if (!campus) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await campus.update({ status: 'I' })

    return res.status(204).send()
  }
}
