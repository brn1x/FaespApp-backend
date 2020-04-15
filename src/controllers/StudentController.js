const Student = require('../models/Student')

module.exports = {
  async index (req, res) {
    const students = await Student.findAll({
      attributes: ['ra', 'name', 'password']
    })

    return res.json(students)
  },

  async findById (req, res) {
    const { id } = req.params

    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(student)
  },

  async store (req, res) {
    const { ra, name, password } = req.body

    const student = await Student.create({ ra, name, password })

    return res.json(student)
  },

  async update (req, res) {
    const { id } = req.params

    const { ra, name, password } = req.body

    const student = await Student.findByPk(id)

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

    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await student.destroy()

    return res.status(204).send()
  }
}
