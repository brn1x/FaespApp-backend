const express = require('express')
const GroupController = require('./controllers/GroupController')
const StudentController = require('./controllers/StudentController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send({ resource: 'Faesp App API' })
})

routes.get('/groups', GroupController.index)
routes.post('/groups', GroupController.store)
routes.get('/groups/:id', GroupController.findById)
routes.put('/groups/:id', GroupController.update)
routes.delete('/groups/:id', GroupController.delete)

routes.get('/students', StudentController.index)
routes.post('/students', StudentController.store)
routes.get('/students/:id', StudentController.findById)
routes.put('/students/:id', StudentController.update)
routes.delete('/students/:id', StudentController.delete)

routes.post('/session', SessionController.create)

module.exports = routes
