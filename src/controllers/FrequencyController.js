const Frequency = require('../models/Frequency')

module.exports = {
  async index (req, res) {
    const frequencies = await Frequency.findAll({
      attributes: ['id', 'subject_id', 'student_id', 'lack', 'class_date'],
      order: ['id']
    })

    return res.json(frequencies)
  },

  async findById (req, res) {
    const { id } = req.params

    const frequency = await Frequency.findOne({ where: { id } })

    if (!frequency) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    return res.json(frequency)
  },

  async store (req, res) {
    const { subject_id, student_id, class_date, lack } = req.body

    const frequency = await Frequency.create({
      subject_id,
      student_id,
      lack,
      class_date
    })

    return res.json(frequency)
  },

  async update (req, res) {
    const { id } = req.params

    const frequency = await Frequency.findOne({ where: { id } })

    if (!frequency) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    const { subject_id, student_id, class_date, lack } = req.body

    await frequency.update({ subject_id, student_id, class_date, lack })

    return res.json(frequency)
  },

  async delete (req, res) {
    const { id } = req.params

    const frequency = await Frequency.findOne({ where: { id } })

    if (!frequency) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Content not found'
      })
    }

    await frequency.destroy()

    return res.status(204).send()
  }
}
