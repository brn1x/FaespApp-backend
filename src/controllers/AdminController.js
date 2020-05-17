const Admin = require('../models/Admin')
const LogController = require('../controllers/LogController')

module.exports = {
  async store (req, res) {
    const { login, password, access_level } = req.body

    const admin = await Admin.create({ login, password, access_level })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Admin user "${admin.login.toUpperCase()}" created`, admin_id)

    return res.json(admin)
  },

  async index (req, res) {
    const admins = await Admin.findAll({
      attributes: ['id', 'login', 'password', 'access_level'],
      order: ['id'],
      where: { status: 'A' }
    })

    return res.json(admins)
  },

  async findById (req, res) {
    const { id } = req.params

    const admin = await Admin.findOne({ where: { id, status: 'A' } })

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

    const admin = await Admin.findOne({ where: { id, status: 'A' } })

    if (!admin) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    const { login, password, access_level } = req.body

    await admin.update({ login, password, access_level })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Admin user "${admin.login.toUpperCase()}" updated`, admin_id)

    return res.json(admin)
  },

  async delete (req, res) {
    const { id } = req.params

    const admin = await Admin.findOne({ where: { id, status: 'A' } })

    if (!admin) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await admin.update({ status: 'I' })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Admin user "${admin.login.toUpperCase()}" inactivated`, admin_id)

    return res.status(204).send()
  }
}
