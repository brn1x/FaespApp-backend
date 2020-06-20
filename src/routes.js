const express = require('express')
const jwt = require('./authentication/jwt')

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
const SubjectController = require('./controllers/SubjectController')
const GradeFreqController = require('./controllers/GradeFreqController')

const LogController = require('./controllers/LogController')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send({ resource: 'Faesp App API' })
})

routes.get('/groups', validateToken, GroupController.index)
routes.get('/groups/all', validateToken, GroupController.allGroups)
routes.post('/groups', validateToken, GroupController.store)
routes.get('/groups/:id', validateToken, GroupController.findById)
routes.put('/groups/:id', validateToken, GroupController.update)
routes.delete('/groups/:id', validateToken, GroupController.delete)

routes.get('/students', validateToken, validateToken, StudentController.index)
routes.post('/students', validateToken, StudentController.store)
routes.get('/students/:id', validateToken, StudentController.findById)
routes.put('/students/:id', validateToken, StudentController.update)
routes.delete('/students/:id', validateToken, StudentController.delete)

routes.post('/session', SessionController.create)

routes.get('/subscription/', validateToken, SubscriptionController.index)
routes.post('/subscription/:id', validateToken, SubscriptionController.subscribe)
routes.delete('/subscription/:id', validateToken, SubscriptionController.unsubscribe)

routes.get('/requests', validateToken, RequestController.index)
routes.put('/requests/accept/:id', validateToken, RequestController.accept)
routes.put('/requests/reject/:id', validateToken, RequestController.decline)

routes.get('/configs/date', validateToken, ConfigDateController.index)
routes.post('/configs/date', validateToken, ConfigDateController.store)
routes.get('/configs/date/:id', validateToken, ConfigDateController.findById)
routes.put('/configs/date/:id', validateToken, ConfigDateController.update)
routes.delete('/configs/date/:id', validateToken, ConfigDateController.delete)

routes.get('/campus', validateToken, CampusController.index)
routes.post('/campus', validateToken, CampusController.store)
routes.get('/campus/:id', validateToken, CampusController.findById)
routes.put('/campus/:id', validateToken, CampusController.update)
routes.delete('/campus/:id', validateToken, CampusController.delete)

routes.get('/categories', validateToken, CategoryController.index)
routes.post('/categories', validateToken, CategoryController.store)
routes.get('/categories/:id', validateToken, CategoryController.findById)
routes.put('/categories/:id', validateToken, CategoryController.update)
routes.delete('/categories/:id', validateToken, CategoryController.delete)

routes.get('/semesters', validateToken, SemesterController.index)
routes.post('/semesters', validateToken, SemesterController.store)
routes.get('/semesters/:id', validateToken, SemesterController.findById)
routes.put('/semesters/:id', validateToken, SemesterController.update)
routes.delete('/semesters/:id', validateToken, SemesterController.delete)

routes.get('/admins', validateToken, AdminController.index)
routes.post('/admins', validateToken, AdminController.store)
routes.get('/admins/:id', validateToken, AdminController.findById)
routes.put('/admins/:id', validateToken, AdminController.update)
routes.delete('/admins/:id', validateToken, AdminController.delete)

routes.get('/subjects', validateToken, SubjectController.index)

routes.get('/grades', validateToken, GradeFreqController.index)

routes.get('/logs', LogController.index)

function validateToken (req, res, next) {
  const token = req.headers.authorization

  const decodedToken = jwt.decode(token)

  if (!decodedToken) {
    return res.status(401).json({
      statusCode: 401,
      error: 'Unauthorized'
    })
  }

  return next()
}

module.exports = routes
