const request = require('supertest')
const app = require('../../src/app')

describe('Testing SessionController', () => {
  it('should create a new session (LOGIN)', async () => {
    const login = await request(app)
      .post('/session')
      .send({
        login: 'admin',
        password: 'faespappQAS'
      })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty('login')
    expect(login.body).toHaveProperty('token')
  })
})
