const Admin = require('../models/Admin')

module.exports = {
  async store (req, res) {
    const { login, password, access_level } = req.body

    const admin = await Admin.create({ login, password, access_level })

    return res.json(admin)
  },

  async index (req, res) {
    const admins = await Admin.findAll({
      attributes: ['id', 'login', 'password', 'access_level'],
      order: ['id']
    })

    return res.json(admins)
  },

  async findById (req, res) {
    const { id } = req.params

    const admin = await Admin.findOne({ where: { id } })

    if (!admin) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(admin)
  },

  async update (req, res) {
    const { id } = req.params

    const admin = await Admin.findOne({ where: { id } })

    if (!admin) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    const { login, password, access_level } = req.body

    await admin.update({ login, password, access_level })

    return res.json(admin)
  },

  async delete (req, res) {
    const { id } = req.params

    const admin = await Admin.findOne({ where: { id } })

    if (!admin) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await admin.destroy()

    return res.status(204).send()
  }
}
