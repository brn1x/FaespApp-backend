const Student = require('../models/Student')
const Admin = require('../models/Admin')

require('dotenv').config()

const axios = require('axios')
const FormData = require('form-data')

const jwt = require('../authentication/jwt')

module.exports = {
  async create (req, res) {
    const { login, password } = req.body

    try {
      const admin = await Admin.findOne({ where: { login, password } })

      if (!admin) {
        const form = new FormData()
        form.append('login', login)
        form.append('password', password)
        form.append('format', 'JSON')

        const response = await axios.post('https://faesp.jacad.com.br:443/academico/api/mobile/autenticar', form, {
          headers: form.getHeaders({ token: process.env.API_TOKEN })
        })

        if (response.status === 200) {
          await Student.findCreateFind({
            where: {
              ra: response.data.perfilMobile.ra,
              student_id: response.data.perfilMobile.idAluno.toString(),
              name: response.data.perfilMobile.nome,
              status: 'A'
            }
          })

          const token = jwt.sign({ login })

          return res.json({
            ra: response.data.perfilMobile.ra,
            name: response.data.perfilMobile.nome,
            celular: response.data.perfilMobile.celular,
            idAluno: response.data.perfilMobile.idAluno,
            avatar: response.data.perfilMobile.avatar,
            accessType: response.data.perfilMobile.tipoAcesso,
            token
          })
        } else {
          return res.status(400).send({
            statusCode: 400,
            error: 'Bad Request'
          })
        }
      }

      const token = jwt.sign({ login })

      return res.json({
        login: admin.login,
        access_level: admin.access_level,
        token
      })
    } catch (err) {
      return res.status(400).send({
        statusCode: 400,
        error: 'Bad Request'
      })
    }
  }
}
