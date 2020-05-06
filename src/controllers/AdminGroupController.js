const AdminGroup = require('../models/AdminGroup')

module.exports = {
  async index (req, res) {
    const admingroups = await AdminGroup.findOne({
      order: [['id', 'DESC']]
    })

    return res.json(admingroups)
  },

  async findById (req, res) {
    const { id } = req.params

    const admingroup = await AdminGroup.findByPk(id)

    if (!admingroup) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(admingroup)
  },

  async store (req, res) {
    const {
      init_create_date,
      end_create_date,
      init_subscription_date,
      end_subscription_date
    } = req.body

    const admingroup = await AdminGroup.create({
      init_create_date,
      end_create_date,
      init_subscription_date,
      end_subscription_date
    })

    return res.json(admingroup)
  },

  async update (req, res) {
    const { id } = req.params

    const {
      init_create_date,
      end_create_date,
      init_subscription_date,
      end_subscription_date
    } = req.body

    const updatedAdminGroup = {
      init_create_date,
      end_create_date,
      init_subscription_date,
      end_subscription_date
    }

    const admingroup = await AdminGroup.findByPk(id)

    if (!admingroup) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await AdminGroup.update(updatedAdminGroup, { where: { id: id } })

    updatedAdminGroup.id = id
    return res.json(updatedAdminGroup)
  },

  async delete (req, res) {
    const { id } = req.params

    const admingroup = await AdminGroup.findByPk(id)

    if (!admingroup) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await admingroup.destroy()

    return res.status(204).send()
  }
}
