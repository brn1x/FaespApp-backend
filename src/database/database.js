const Sequelize = require('sequelize')
const config = require('./config')

const Group = require('../models/Group')
const Student = require('../models/Student')
const ConfigDate = require('../models/ConfigDate')
const Campus = require('../models/Campus')
const Semester = require('../models/Semester')
const Category = require('../models/Category')
const Admin = require('../models/Admin')

const env = process.env.NODE_ENV === 'test' ? config.test : config.development

const database = new Sequelize(env)

Campus.init(database)
Category.init(database)
Semester.init(database)
Group.init(database)
Student.init(database)
ConfigDate.init(database)
Admin.init(database)

Group.associate(database.models)
Student.associate(database.models)

module.exports = database
