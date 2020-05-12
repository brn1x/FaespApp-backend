const request = require('supertest')
const app = require('../../src/app')

describe('Testing GroupsController', () => {
  it('should create a new Request', async () => {
    const request1 = await request(app)
      .post('/groups')
      .send({
        name: 'Request Test',
        description: 'Test description',
        category_id: 1,
        ra_group_owner: '12345678900',
        qtt_min_students: 1,
        qtt_max_students: 5,
        qtt_meetings: 10,
        campus_id: 1,
        semester_id: 1,
        period: 'N',
        status: 'P'
      })

    await request(app)
      .post('/groups')
      .send({
        name: 'Request Test',
        description: 'Test description',
        category_id: 1,
        ra_group_owner: '12345678900',
        qtt_min_students: 1,
        qtt_max_students: 5,
        qtt_meetings: 10,
        campus_id: 1,
        semester_id: 1,
        period: 'N',
        status: 'P'
      })

    expect(request1.status).toBe(200)
    expect(request1.body).toHaveProperty('name')
  })

  it('should be able to list all requests', async () => {
    const requests = await request(app)
      .get('/requests')

    expect(requests.body[0]).toHaveProperty('name')
    expect(requests.body).toHaveLength(2)
  })

  it('should be able to accept a request', async () => {
    const acceptRequest = await request(app)
      .put('/requests/accept/2')

    expect(acceptRequest.status).toBe(200)
    expect(acceptRequest.body).toHaveProperty('name')
    expect(acceptRequest.body.status).toBe('A')
  })

  it('should be able to decline a request', async () => {
    const declineRequest = await request(app)
      .put('/requests/reject/3')

    expect(declineRequest.status).toBe(200)
    expect(declineRequest.body).toHaveProperty('name')
    expect(declineRequest.body.status).toBe('R')
  })
})
