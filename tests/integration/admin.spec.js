const request = require('supertest')
const app = require('../../src/app')

describe('Testing AdminController', () => {
  it('should be able to CREATE an Administrador', async () => {
    const admin = await request(app)
      .post('/admins')
      .send({
        login: 'admin',
        password: 'admin',
        access_level: 3
      })

    expect(admin.status).toBe(200)
    expect(admin.body).toHaveProperty('login')
  })

  it('should be able to UPDATE an Administrador', async () => {
    const admin = await request(app)
      .get('/admins/2')

    const updatedAdmin = await request(app)
      .put('/admins/2')
      .send({
        login: 'admin updated',
        password: 'admin',
        access_level: 3
      })

    expect(admin.body.login).toBe('admin')
    expect(updatedAdmin.status).toBe(200)
    expect(updatedAdmin.body.login).not.toBe(admin.body.login)
    expect(updatedAdmin.body.id.toString()).toBe(admin.body.id.toString())
    expect(updatedAdmin.body.login).toBe('admin updated')
  })

  it('should be able to DELETE an Administrador', async () => {
    const deletedAdmin = await request(app)
      .delete('/admins/2')

    const admin = await request(app)
      .get('/admins/2')

    expect(deletedAdmin.status).toBe(204)
    expect(admin.body).toHaveProperty('error')
    expect(admin.body.error).toBe('Content not found')
  })

  it('should be able to LIST ALL Administradors', async () => {
    for (let i = 1; i < 4; i++) {
      await request(app)
        .post('/admins')
        .send({
          login: `admin ${i}`,
          password: 'admin',
          access_level: 3
        })
    }

    const admin = await request(app)
      .get('/admins')

    expect(admin.status).toBe(200)
    expect(admin.body).toHaveLength(4)
    expect(admin.body[0]).toHaveProperty('login')
  })
})
