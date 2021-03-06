const FormData = require('form-data')
const axios = require('axios')

module.exports = {
  async index (req, res) {
    const form = new FormData()
    form.append('idCurso', 16)
    form.append('format', 'JSON')

    const response = await axios.post('https://faesp.jacad.com.br:443/academico/api/v1/opa/matriz/disciplinas', form, {
      headers: form.getHeaders({ token: process.env.API_TOKEN })
    })

    return res.json(response.data)
  }
}
