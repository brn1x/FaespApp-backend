const ConfigDate = require('../models/ConfigDate')
const LogController = require('../controllers/LogController')

module.exports = {
  async index (req, res) {
    const configDate = await ConfigDate.findOne({
      order: [['id', 'DESC']],
      where: { status: 'A' }
    })

    return res.json(configDate)
  },

  async findById (req, res) {
    const { id } = req.params

    const configDate = await ConfigDate.findOne({ where: { id, status: 'A' } })

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

    const adminLogin = req.headers['x-logged-user']
    await LogController.store(`Config Date ID[${configDate.id}] created`, adminLogin)

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

    const configDate = await ConfigDate.findOne({ where: { id, status: 'A' } })

    if (!configDate) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await configDate.update({ init_create_date, end_create_date, init_subscription_date, end_subscription_date })

    const adminLogin = req.headers['x-logged-user']
    await LogController.store(`Config Date ID[${configDate.id}] updated`, adminLogin)

    return res.json(configDate)
  },

  async delete (req, res) {
    const { id } = req.params

    const configDate = await ConfigDate.findOne({ where: { id, status: 'A' } })

    if (!configDate) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await configDate.update({ status: 'I' })

    const adminLogin = req.headers['x-logged-user']
    await LogController.store(`Config Date ID[${configDate.id}] inactivated`, adminLogin)

    return res.status(204).send()
  }
}
