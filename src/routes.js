const express = require('express')
const GroupController = require('./controllers/GroupController')
const StudentController = require('./controllers/StudentController')
const SessionController = require('./controllers/SessionController')
const SubscriptionController = require('./controllers/SubscriptionController')
const RequestController = require('./controllers/RequestController')
const ConfigDateController = require('./controllers/ConfigDateController')
const CampusController = require('./controllers/CampusController')
const CategoryController = require('./controllers/CategoryController')
const SemesterController = require('./controllers/SemesterController')
const AdminController = require('./controllers/AdminController')

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

routes.get('/configs/date', ConfigDateController.index)
routes.post('/configs/date', ConfigDateController.store)
routes.get('/configs/date/:id', ConfigDateController.findById)
routes.put('/configs/date/:id', ConfigDateController.update)
routes.delete('/configs/date/:id', ConfigDateController.delete)

routes.get('/campus', CampusController.index)
routes.post('/campus', CampusController.store)
routes.get('/campus/:id', CampusController.findById)
routes.put('/campus/:id', CampusController.update)
routes.delete('/campus/:id', CampusController.delete)

routes.get('/categories', CategoryController.index)
routes.post('/categories', CategoryController.store)
routes.get('/categories/:id', CategoryController.findById)
routes.put('/categories/:id', CategoryController.update)
routes.delete('/categories/:id', CategoryController.delete)

routes.get('/semesters', SemesterController.index)
routes.post('/semesters', SemesterController.store)
routes.get('/semesters/:id', SemesterController.findById)
routes.put('/semesters/:id', SemesterController.update)
routes.delete('/semesters/:id', SemesterController.delete)

routes.get('/admins', AdminController.index)
routes.post('/admins', AdminController.store)
routes.get('/admins/:id', AdminController.findById)
routes.put('/admins/:id', AdminController.update)
routes.delete('/admins/:id', AdminController.delete)

module.exports = routes
