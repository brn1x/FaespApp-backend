const Course = require('../models/Course')

module.exports = {
  async index (req, res) {
    const courses = await Course.findAll({
      attributes: ['id', 'name', 'status'],
      order: ['id'],
      where: { status: 'A' }
    })

    return res.json(courses)
  },

  async findById (req, res) {
    const { id } = req.params

    const course = await Course.findOne({ where: { id, status: 'A' } })

    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(course)
  },

  async store (req, res) {
    const { name, status } = req.body

    const course = await Course.create({ name, status })

    return res.json(course)
  },

  async update (req, res) {
    const { id } = req.params

    const course = await Course.findOne({ where: { id, status: 'A' } })

    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    const { name, status } = req.body

    await course.update({ name, status })

    return res.json(course)
  },

  async delete (req, res) {
    const { id } = req.params

    const course = await Course.findOne({ where: { id, status: 'A' } })

    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await course.update({ status: 'I' })

    return res.status(204).send()
  }
}
