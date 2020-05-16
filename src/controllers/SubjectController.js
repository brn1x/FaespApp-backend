const Subject = require('../models/Subject')

module.exports = {
  async index (req, res) {
    const subjects = await Subject.findAll({
      attributes: ['id', 'name', 'qtt_classes', 'course_id', 'status'],
      order: ['id'],
      where: { status: true }
    })

    return res.json(subjects)
  },

  async findById (req, res) {
    const { id } = req.params

    const subjects = await Subject.findOne({ where: { id, status: true } })

    if (!subjects) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(subjects)
  },

  async store (req, res) {
    const { name, qtt_classes, course_id, status } = req.body

    const subject = await Subject.create({
      name,
      qtt_classes,
      course_id,
      status
    })

    return res.json(subject)
  },

  async update (req, res) {
    const { id } = req.params

    const subject = await Subject.findOne({ where: { id, status: true } })

    if (!subject) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    const { name, qtt_classes, course_id, status } = req.body

    await subject.update({ name, qtt_classes, course_id, status })

    return res.json(subject)
  },

  async delete (req, res) {
    const { id } = req.params

    const subject = await Subject.findOne({ where: { id, status: true } })

    if (!subject) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await subject.update({ status: false })

    return res.status(204).send()
  }
}
