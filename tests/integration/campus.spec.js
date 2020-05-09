const request = require('supertest')
const app = require('../../src/app')

describe('Testing CampusController', () => {
  it('should create a campus', async () => {
    const campus = await request(app)
      .post('/campus')
      .send({
        name: 'Test Campus'
      })

    expect(campus.status).toBe(200)
    expect(campus.body).toHaveProperty('name')
  })

  it('should update a campus', async () => {
    const campus = await request(app)
      .get('/campus/2')

    const updatedCampus = await request(app)
      .put('/campus/2')
      .send({
        name: 'Updated Campus'
      })

    expect(campus.body.name).toBe('Test Campus')
    expect(updatedCampus.status).toBe(200)
    expect(updatedCampus.body.name).not.toBe(campus.body.name)
    expect(updatedCampus.body.id.toString()).toBe(campus.body.id.toString())
    expect(updatedCampus.body.name).toBe('Updated Campus')
  })

  it('should delete a campus', async () => {
    const deletedCampus = await request(app)
      .delete('/campus/2')

    const campus = await request(app)
      .get('/campus/2')

    expect(deletedCampus.status).toBe(204)
    expect(campus.body).toHaveProperty('error')
    expect(campus.body.error).toBe('Content not found')
  })

  it('should list all campus', async () => {
    for (let i = 1; i < 4; i++) {
      await request(app)
        .post('/campus')
        .send({
          name: `Campus Test${i}`
        })
    }

    const campus = await request(app)
      .get('/campus')

    expect(campus.status).toBe(200)
    expect(campus.body).toHaveLength(4)
    expect(campus.body[0]).toHaveProperty('name')
  })
})
