const FormData = require('form-data')
const axios = require('axios')

module.exports = {
  async index (req, res) {
    const user = req.headers['x-logged-user']

    const form = new FormData()
    form.append('idAluno', user)
    form.append('format', 'JSON')

    const response = await axios.post('https://faesp.jacad.com.br:443/academico/api/mobile/notas', form, {
      headers: form.getHeaders({ token: process.env.API_TOKEN })
    })

    return res.json(response.data)
  }
}
