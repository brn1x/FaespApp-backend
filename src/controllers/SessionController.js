const Student = require('../models/Student')

module.exports = {
  async create (req, res) {
    const { ra, password } = req.body

    const student = await Student.findOne({ where: { ra, password } })

    if (!student) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.status(200).json({
      ra: student.ra,
      name: student.name
    })
  }
}
