const express = require('express')
const GroupController = require('./controllers/GroupController')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send({ resource: 'Faesp App API' })
})

routes.get('/groups', GroupController.index)
routes.get('/groups/:id', GroupController.findById)
routes.put('/groups/:id', GroupController.update)
routes.post('/groups', GroupController.store)
routes.delete('/groups/:id', GroupController.delete)

routes.get('/students')
routes.post('/students')

module.exports = routes
