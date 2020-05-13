const Student = require('../models/Student')
const Admin = require('../models/Admin')

module.exports = {
  async create (req, res) {
    const { login, password } = req.body

    const student = await Student.findOne({ where: { ra: login, password } })

    if (!student) {
      const admin = await Admin.findOne({ where: { login, password } })

      if (!admin) {
        return res.status(404).json({
          statusCode: 404,
          error: 'Content not found'
        })
      }

      return res.json({
        login,
        authorized: true
      })
    }

    return res.status(200).json({
      ra: student.ra,
      name: student.name,
      authorized: true
    })
  }
}
