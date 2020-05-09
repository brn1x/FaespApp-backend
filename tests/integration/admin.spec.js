const request = require('supertest')
const app = require('../../src/app')

describe('Testing GroupAdminController', () => {
  it('should create a new AdminGroup', async () => {
    const adminGroup = await request(app)
      .post('/admin')
      .send({
        init_create_date: '1998-08-18',
        end_create_date: '2002-08-18',
        init_subscription_date: '1985-01-11',
        end_subscription_date: '1998-01-11'
      })

    expect(adminGroup.status).toBe(200)
    expect(adminGroup.body).toHaveProperty('init_create_date')
  })

  it('should update an AdminGroup information', async () => {
    const adminGroup = await request(app)
      .get('/admin/1')

    const updatedAdminGroup = await request(app)
      .put('/admin/1')
      .send({
        init_create_date: '2000-12-21',
        end_create_date: '2000-12-21',
        init_subscription_date: '2000-12-21',
        end_subscription_date: '2000-12-21'
      })

    console.log(adminGroup.body.init_create_date)
    console.log(updatedAdminGroup.body.init_create_date)

    expect(adminGroup.body.init_create_date).toBe('1998-08-18')
    expect(updatedAdminGroup.body.init_create_date).not.toBe(adminGroup.body.init_create_date)
    expect(updatedAdminGroup.body.init_create_date).toBe('2000-12-21')
    expect(adminGroup.body.id.toString()).toBe(updatedAdminGroup.body.id.toString())
  })

  it('should delete an AdminGroup', async () => {
    const deletedAdminGroup = await request(app)
      .delete('/admin/1')

    const adminGroup = await request(app)
      .get('/admin/1')

    expect(deletedAdminGroup.status).toBe(204)
    expect(adminGroup.body).toHaveProperty('error')
  })

  it('should bring the information from the latest AdminGroup created', async () => {
    await request(app)
      .post('/admin')
      .send({
        init_create_date: '1998-08-18',
        end_create_date: '2002-08-18',
        init_subscription_date: '1985-01-11',
        end_subscription_date: '1998-01-11'
      })

    await request(app)
      .post('/admin')
      .send({
        init_create_date: '2020-02-02',
        end_create_date: '2020-02-02',
        init_subscription_date: '2020-02-02',
        end_subscription_date: '2020-02-02'
      })

    const adminGroup = await request(app)
      .get('/admin')

    // expect(adminGroup.body).toHaveLength(1)
    expect(adminGroup.body.init_create_date).toBe('2020-02-02')
  })
})
