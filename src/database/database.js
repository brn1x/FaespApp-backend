const Sequelize = require('sequelize')
const config = require('./config')

const Group = require('../models/Group')
const Student = require('../models/Student')
const ConfigDate = require('../models/ConfigDate')
const Campus = require('../models/Campus')
const Semester = require('../models/Semester')
const Category = require('../models/Category')
const Admin = require('../models/Admin')
const Course = require('../models/Course')
const Subject = require('../models/Subject')
const Grade = require('../models/Grade')
const Frequency = require('../models/Frequency')
const Log = require('../models/Log')

const env = process.env.NODE_ENV === 'test' ? config.test : config.development

const database = new Sequelize(env)

Campus.init(database)
Category.init(database)
Semester.init(database)
Group.init(database)
Student.init(database)
ConfigDate.init(database)
Admin.init(database)
Course.init(database)
Subject.init(database)
Grade.init(database)
Frequency.init(database)
Log.init(database)

Group.associate(database.models)
Student.associate(database.models)
Course.associate(database.models)
Subject.associate(database.models)
Grade.associate(database.models)
Frequency.associate(database.models)
Admin.associate(database.models)
Log.associate(database.models)

module.exports = database
