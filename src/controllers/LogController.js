const Log = require('../models/Log')
const Admin = require('../models/Admin')

module.exports = {
  async index (req, res) {
    const admin_id = req.headers['x-logged-user'] || 0

    const admin = await Admin.findOne({ where: { id: admin_id } })

    if (!admin) {
      return res.status(401).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    if (admin.access_level !== 3) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized'
      })
    }

    const logs = await Log.findAll({
      attributes: ['id', 'admin_id', 'log'],
      order: ['id'],
      include: { association: 'admin', attributes: ['id', 'login'] }
    })

    return res.json(logs)
  },

  async store (log, id) {
    const admin = await Admin.findOne({ where: { id } })

    if (!admin) {
      return
    }

    await Log.create({
      log,
      admin_id: id
    })
  }
}
