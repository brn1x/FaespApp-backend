const Student = require('../models/Student')

module.exports = {
  async store (req, res) {
    const { token, ra } = req.body

    const student = await Student.findOne({
      where: {
        ra
      }
    })

    if (!student) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    if (student.dataValues.token === '') {
      await student.update({ token })
    }

    return res.json(student)
  }
}
