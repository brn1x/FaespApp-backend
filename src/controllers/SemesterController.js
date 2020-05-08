const Semester = require('../models/Semester')

module.exports = {
  async index (req, res) {
    const semesters = await Semester.findAll({
      where: { status: 'A' }
    })

    return res.json(semesters)
  },

  async findById (req, res) {
    const { id } = req.params

    const semester = await Semester.findOne({ where: { id, status: 'A' } })

    if (!semester) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(semester)
  },

  async store (req, res) {
    const { name } = req.body

    const semester = await Semester.create({ name })

    return res.json(semester)
  },

  async delete (req, res) {
    const { id } = req.params

    const semester = await Semester.findOne({ where: { id, status: 'A' } })

    if (!semester) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await semester.update({ status: 'I' })

    return res.status(204).send()
  },

  async update (req, res) {
    const { id } = req.params

    const { name } = req.body

    const semester = await Semester.findOne({ where: { id, status: 'A' } })

    if (!semester) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await semester.update({ name })

    return res.json(semester)
  }
}
