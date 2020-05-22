const Student = require('../models/Student')
const Subject = require('../models/Subject')

module.exports = {
  async index (req, res) {
    const students = await Student.findAll({
      attributes: ['ra', 'name', 'password', 'course_id'],
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
    const { ra, name, password, course_id } = req.body

    const student = await Student.create({ ra, name, password, course_id })

    const subjects = await Subject.findAll({ where: { course_id } })

    if (subjects.length > 1) {
      subjects.map(async subject => {
        await student.addSubjects(subject)
      })
    }

    return res.json(student)
  },

  async update (req, res) {
    const { id } = req.params

    const { ra, name, password } = req.body

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
    await student.update({ name, password })

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
