const request = require('supertest')
const app = require('../../src/app')

describe('Testing SessionController', () => {
  it('should create a new session (LOGIN)', async () => {
    await request(app)
      .post('/students')
      .send({
        ra: '00000000000',
        name: 'Student fixed',
        password: 'fixed'
      })

    const login = await request(app)
      .post('/session')
      .send({
        ra: '00000000000',
        password: 'fixed'
      })

    const fakeLogin = await request(app)
      .post('/session')
      .send({
        ra: '10000000000',
        password: '12345'
      })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty('ra')
    expect(login.body).toHaveProperty('name')

    expect(fakeLogin.status).toBe(404)
    expect(fakeLogin.body).toHaveProperty('error')
    expect(fakeLogin.body.error).toBe('Content not found')
  })
})
