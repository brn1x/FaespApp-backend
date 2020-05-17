const Category = require('../models/Category')
const LogController = require('../controllers/LogController')

module.exports = {
  async index (req, res) {
    const categories = await Category.findAll({
      where: { status: 'A' }
    })

    return res.json(categories)
  },

  async findById (req, res) {
    const { id } = req.params

    const category = await Category.findOne({ where: { id, status: 'A' } })

    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(category)
  },

  async store (req, res) {
    const { name } = req.body

    const category = await Category.create({ name })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Category "${category.name.toUpperCase()}" created`, admin_id)

    return res.json(category)
  },

  async delete (req, res) {
    const { id } = req.params

    const category = await Category.findOne({ where: { id, status: 'A' } })

    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await category.update({ status: 'I' })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Category "${category.name.toUpperCase()}" inativated`, admin_id)

    return res.status(204).send()
  },

  async update (req, res) {
    const { id } = req.params

    const category = await Category.findOne({ where: { id, status: 'A' } })

    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    const { name } = req.body

    await category.update({ name })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Category "${category.name.toUpperCase()}" updated`, admin_id)

    return res.json(category)
  }
}
