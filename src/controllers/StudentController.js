const Student = require('../models/Student')

module.exports = {
  async index (req, res) {
    const students = await Student.findAll({
      attributes: ['ra', 'name', 'student_id'],
      where: { status: 'A' }
    })

    return res.json(students)
  },

  async findById (req, res) {
    const { id } = req.params

    const student = await Student.findOne({ where: { id, status: 'A' } })

    if (!student) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(student)
  },

  async store (req, res) {
    const { ra, name, student_id } = req.body

    const student = await Student.create({ ra, name, student_id })

    return res.json(student)
  },

  async update (req, res) {
    const { id } = req.params

    const { ra, name, student_id } = req.body

    const student = await Student.findOne({ where: { id, status: 'A' } })

    if (!student) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    if (ra !== student.ra) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error'
      })
    }
    await student.update({ name, student_id })

    return res.json(student)
  },

  async delete (req, res) {
    const { id } = req.params

    const student = await Student.findOne({ where: { id, status: 'A' } })

    if (!student) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    student.update({ status: 'I' })

    return res.status(204).send()
  }
}
