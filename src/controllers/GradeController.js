const Grade = require('../models/Grade')

module.exports = {
  async index (req, res) {
    const grades = await Grade.findAll({
      attributes: ['id', 'agm1', 'agm2', 'tb1', 'tb2', 'subject_id', 'student_id'],
      order: ['id']
    })

    return res.json(grades)
  },

  async findById (req, res) {
    const { id } = req.params

    const grade = await Grade.findOne({ where: { id } })

    if (!grade) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(grade)
  },

  async store (req, res) {
    const { agm1, agm2, tb1, tb2, student_id, subject_id } = req.body

    const grade = await Grade.create({
      agm1,
      agm2,
      tb1,
      tb2,
      student_id,
      subject_id
    })

    return res.json(grade)
  },

  async update (req, res) {
    const { id } = req.params

    const grade = await Grade.findOne({ where: { id } })

    if (!grade) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    const { agm1, agm2, tb1, tb2, student_id, subject_id } = req.body

    await grade.update({ agm1, agm2, tb1, tb2, student_id, subject_id })

    return res.json(grade)
  },

  async delete (req, res) {
    const { id } = req.params

    const grade = await Grade.findOne({ where: { id } })

    if (!grade) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await grade.destroy()

    return res.status(204).send()
  }
}
