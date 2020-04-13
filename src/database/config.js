require('dotenv').config()

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.HOST_DB,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    define: {
      timestamps: true,
      underscored: true,
      ssl: true
    }
  },

  test: {
    dialect: 'postgres',
    host: process.env.QAS_HOST_DB,
    username: process.env.QAS_USERNAME_DB,
    password: process.env.QAS_PASSWORD_DB,
    database: process.env.QAS_DATABASE_DB,
    define: {
      timestamps: true,
      underscored: true,
      ssl: true
    }
  }
}
