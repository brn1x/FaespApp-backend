const Semester = require('../models/Semester')
const ConfigDate = require('../models/ConfigDate')
const LogController = require('../controllers/LogController')
const createSemesterName = require('../utils/CreateSemesterName')

module.exports = {
  async index (req, res) {
    const semesters = await Semester.findAll({
      where: { status: 'A' }
    })

    return res.json(semesters)
  },

  async findById (req, res) {
    const { id } = req.params

    const semester = await Semester.findOne({ where: { id, status: 'A' } })

    if (!semester) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(semester)
  },

  async store (req, res) {
    const semesterName = createSemesterName()

    const semester = await Semester.create({ name: semesterName })

    const configDate = await ConfigDate.create({
      init_create_date: new Date(),
      end_create_date: new Date(),
      init_subscription_date: new Date(),
      end_subscription_date: new Date(),
      status: 'A'
    })

    const lastConfigDate = await ConfigDate.findByPk(configDate.id - 1)
    await lastConfigDate.update({ status: 'I' })

    const lastSemester = await Semester.findByPk(semester.id - 1)
    await lastSemester.update({ status: 'I' })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Semester "${semester.name.toUpperCase()}" created`, admin_id)

    return res.json(semester)
  },

  async delete (req, res) {
    const { id } = req.params

    const semester = await Semester.findOne({ where: { id, status: 'A' } })

    if (!semester) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await semester.update({ status: 'I' })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Semester "${semester.name.toUpperCase()}" inactivated`, admin_id)

    return res.status(204).send()
  },

  async update (req, res) {
    const { id } = req.params

    const { name } = req.body

    const semester = await Semester.findOne({ where: { id, status: 'A' } })

    if (!semester) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await semester.update({ name })

    const admin_id = req.headers['x-logged-user']
    await LogController.store(`Semester "${semester.name.toUpperCase()}" updated`, admin_id)

    return res.json(semester)
  }
}
