const express = require('express')
const jwt = require('./authentication/jwt')
const { celebrate, Joi } = require('celebrate')

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

// ==================== GROUPS ====================
routes.get('/groups', validateToken, GroupController.index)
routes.get('/groups/all', validateToken, GroupController.allGroups)
routes.post(
  '/groups',
  validateToken,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      ra_group_owner: Joi.string().required().min(11).max(11),
      qtt_min_students: Joi.number().required(),
      qtt_max_students: Joi.number().required(),
      qtt_meetings: Joi.number().required(),
      period: Joi.string().required().max(1),
      category_id: Joi.number().required().max(1),
      semester_id: Joi.number().required().max(1),
      campus_id: Joi.number().required().max(1)
    })
  }, {
    abortEarly: false
  }),
  GroupController.store
)
routes.get('/groups/:id', validateToken, GroupController.findById)
routes.put(
  '/groups/:id',
  validateToken,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      ra_group_owner: Joi.string().required().min(11).max(11),
      qtt_min_students: Joi.number().required(),
      qtt_max_students: Joi.number().required(),
      qtt_meetings: Joi.number().required(),
      period: Joi.string().required().max(1),
      category_id: Joi.number().required().max(1),
      semester_id: Joi.number().required().max(1),
      campus_id: Joi.number().required().max(1)
    })
  }, {
    abortEarly: false
  }),
  GroupController.update
)
routes.delete('/groups/:id', validateToken, GroupController.delete)

// ==================== STUDENT ====================
routes.get('/students', validateToken, validateToken, StudentController.index)
routes.post(
  '/students',
  validateToken,
  celebrate({
    body: Joi.object().keys({
      ra: Joi.string().required().min(11).max(11),
      name: Joi.string().required(),
      student_id: Joi.string().required().min(4).max(6)
    })
  }, {
    abortEarly: false
  }),
  StudentController.store
)
routes.get('/students/:id', validateToken, StudentController.findById)
routes.put(
  '/students/:id',
  validateToken,
  celebrate({
    body: Joi.object().keys({
      ra: Joi.string().required().min(11).max(11),
      name: Joi.string().required(),
      student_id: Joi.string().required().min(4).max(6)
    })
  }, {
    abortEarly: false
  }),
  StudentController.update
)
routes.delete('/students/:id', validateToken, StudentController.delete)

// ==================== SESSION ====================
routes.post(
  '/session',
  celebrate({
    body: Joi.object().keys({
      login: Joi.string().required(),
      password: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  SessionController.create)

// ==================== SUBSCRIPTION ====================
routes.get('/subscription/', validateToken, SubscriptionController.index)
routes.post('/subscription/:id', validateToken, SubscriptionController.subscribe)
routes.delete('/subscription/:id', validateToken, SubscriptionController.unsubscribe)

// ==================== REQUESTS ====================
routes.get('/requests', validateToken, RequestController.index)
routes.put('/requests/accept/:id', validateToken, RequestController.accept)
routes.put('/requests/reject/:id', validateToken, RequestController.decline)

// ==================== CONFIG DATE ====================
routes.get('/configs/date', validateToken, ConfigDateController.index)
routes.post(
  '/configs/date',
  celebrate({
    body: Joi.object().keys({
      init_create_date: Joi.date().required(),
      end_create_date: Joi.date().required(),
      init_subscription_date: Joi.date().required(),
      end_subscription_date: Joi.date().required()
    })
  }, {
    abortEarly: false
  }),
  validateToken,
  ConfigDateController.store
)
routes.get('/configs/date/:id', validateToken, ConfigDateController.findById)
routes.put(
  '/configs/date/:id',
  celebrate({
    body: Joi.object().keys({
      init_create_date: Joi.date().required(),
      end_create_date: Joi.date().required(),
      init_subscription_date: Joi.date().required(),
      end_subscription_date: Joi.date().required()
    })
  }, {
    abortEarly: false
  }),
  validateToken,
  ConfigDateController.update
)
routes.delete('/configs/date/:id', validateToken, ConfigDateController.delete)

// ==================== CAMPUS ====================
routes.get('/campus', validateToken, CampusController.index)
routes.post(
  '/campus',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  validateToken,
  CampusController.store
)
routes.get('/campus/:id', validateToken, CampusController.findById)
routes.put(
  '/campus/:id',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  validateToken,
  CampusController.update
)
routes.delete('/campus/:id', validateToken, CampusController.delete)

// ==================== CATEGORIES ====================
routes.get('/categories', validateToken, CategoryController.index)
routes.post(
  '/categories',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  validateToken,
  CategoryController.store
)
routes.get('/categories/:id', validateToken, CategoryController.findById)
routes.put(
  '/categories/:id',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  validateToken,
  CategoryController.update
)
routes.delete('/categories/:id', validateToken, CategoryController.delete)

// ==================== SEMESTERS ====================
routes.get('/semesters', validateToken, SemesterController.index)
routes.post(
  '/semesters',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  validateToken,
  SemesterController.store
)
routes.get('/semesters/:id', validateToken, SemesterController.findById)
routes.put(
  '/semesters/:id',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  validateToken,
  SemesterController.update
)
routes.delete('/semesters/:id', validateToken, SemesterController.delete)

// ==================== ADMINS ====================
routes.get('/admins', validateToken, AdminController.index)
routes.post(
  '/admins',
  celebrate({
    body: Joi.object().keys({
      login: Joi.string().required(),
      password: Joi.string().required(),
      access_level: Joi.number().min(1).max(3)
    })
  }, {
    abortEarly: false
  }),
  validateToken,
  AdminController.store
)
routes.get('/admins/:id', validateToken, AdminController.findById)
routes.put(
  '/admins/:id',
  celebrate({
    body: Joi.object().keys({
      login: Joi.string().required(),
      password: Joi.string().required(),
      access_level: Joi.number().min(1).max(3)
    })
  }, {
    abortEarly: false
  }),
  validateToken,
  AdminController.update
)
routes.delete('/admins/:id', validateToken, AdminController.delete)

routes.get('/subjects', validateToken, SubjectController.index) // DISCIPLINAS

routes.get('/grades', validateToken, GradeFreqController.index) // NOTAS

routes.get('/logs', LogController.index) // LOGS

// ==================== TOKEN VALIDATION ON ROUTES ====================
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
