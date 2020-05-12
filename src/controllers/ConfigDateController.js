const ConfigDate = require('../models/ConfigDate')

module.exports = {
  async index (req, res) {
    const configDate = await ConfigDate.findOne({
      order: [['id', 'DESC']]
    })

    return res.json(configDate)
  },

  async findById (req, res) {
    const { id } = req.params

    const configDate = await ConfigDate.findByPk(id)

    if (!configDate) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(configDate)
  },

  async store (req, res) {
    const {
      init_create_date,
      end_create_date,
      init_subscription_date,
      end_subscription_date
    } = req.body

    const configDate = await ConfigDate.create({
      init_create_date,
      end_create_date,
      init_subscription_date,
      end_subscription_date
    })

    return res.json(configDate)
  },

  async update (req, res) {
    const { id } = req.params

    const {
      init_create_date,
      end_create_date,
      init_subscription_date,
      end_subscription_date
    } = req.body

    const updatedConfigDate = {
      init_create_date,
      end_create_date,
      init_subscription_date,
      end_subscription_date
    }

    const configDate = await ConfigDate.findByPk(id)

    if (!configDate) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await ConfigDate.update(updatedConfigDate, { where: { id: id } })

    updatedConfigDate.id = id
    return res.json(updatedConfigDate)
  },

  async delete (req, res) {
    const { id } = req.params

    const configDate = await ConfigDate.findByPk(id)

    if (!configDate) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await configDate.destroy()

    return res.status(204).send()
  }
}
