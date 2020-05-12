const request = require('supertest')
const app = require('../../src/app')

describe('Testing ConfigDateController', () => {
  it('should create a new ConfigDate', async () => {
    const configDate = await request(app)
      .post('/configs/date')
      .send({
        init_create_date: '2020-01-18',
        end_create_date: '2025-08-18',
        init_subscription_date: '2020-01-11',
        end_subscription_date: '2025-08-18'
      })

    expect(configDate.status).toBe(200)
    expect(configDate.body).toHaveProperty('init_create_date')
  })

  it('should update an ConfigDate information', async () => {
    const configDate = await request(app)
      .get('/configs/date/2')

    const updatedConfigDate = await request(app)
      .put('/configs/date/2')
      .send({
        init_create_date: '2020-01-21',
        end_create_date: '2025-12-21',
        init_subscription_date: '2020-01-21',
        end_subscription_date: '2025-12-21'
      })

    expect(configDate.body.init_create_date).toBe('2020-01-18')
    expect(updatedConfigDate.body.init_create_date).not.toBe(configDate.body.init_create_date)
    expect(updatedConfigDate.body.init_create_date).toBe('2020-01-21')
    expect(configDate.body.id.toString()).toBe(updatedConfigDate.body.id.toString())
  })

  it('should delete an ConfigDate', async () => {
    const deletedConfigDate = await request(app)
      .delete('/configs/date/2')

    const configDate = await request(app)
      .get('/configs/date/2')

    expect(deletedConfigDate.status).toBe(204)
    expect(configDate.body).toHaveProperty('error')
  })

  it('should bring the information from the latest ConfigDate created', async () => {
    await request(app)
      .post('/configs/date')
      .send({
        init_create_date: '2020-01-18',
        end_create_date: '2025-08-18',
        init_subscription_date: '2020-01-11',
        end_subscription_date: '2025-11-11'
      })

    await request(app)
      .post('/configs/date')
      .send({
        init_create_date: '2020-01-02',
        end_create_date: '2025-10-02',
        init_subscription_date: '2020-02-02',
        end_subscription_date: '2025-10-02'
      })

    const configDate = await request(app)
      .get('/configs/date')

    expect(configDate.body.init_create_date).toBe('2020-01-02')
  })
})
