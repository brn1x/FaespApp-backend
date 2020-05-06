const express = require('express')
const GroupController = require('./controllers/GroupController')
const StudentController = require('./controllers/StudentController')
const SessionController = require('./controllers/SessionController')
const SubscriptionController = require('./controllers/SubscriptionController')
const RequestController = require('./controllers/RequestController')
const AdminGroupController = require('./controllers/AdminGroupController')

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

routes.post('/subscription/:id', SubscriptionController.subscribe)
routes.delete('/subscription/:id', SubscriptionController.unsubscribe)

routes.get('/requests', RequestController.index)
routes.put('/requests/accept/:id', RequestController.accept)
routes.put('/requests/reject/:id', RequestController.decline)

routes.get('/admin', AdminGroupController.index)
routes.post('/admin', AdminGroupController.store)
routes.get('/admin/:id', AdminGroupController.findById)
routes.put('/admin/:id', AdminGroupController.update)
routes.delete('/admin/:id', AdminGroupController.delete)

module.exports = routes
