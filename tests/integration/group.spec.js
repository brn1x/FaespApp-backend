const request = require('supertest')
const app = require('../../src/app')

describe('Testing GroupsController', () => {
  it('should create a new Group', async () => {
    const group = await request(app)
      .post('/groups')
      .send({
        name: 'Group Test',
        description: 'Test description',
        category: 'Test category',
        qtt_min_students: 1,
        qtt_max_students: 5,
        qtt_meetings: 10
      })

    expect(group.body).toHaveProperty('name')
  })

  it('should update a group information', async () => {
    const group = await request(app)
      .get('/groups/1')

    const updatedGroup = await request(app)
      .put('/groups/1')
      .send({
        name: 'Group Updated',
        description: 'Description Updated',
        category: 'Category Updated',
        qtt_min_students: 10,
        qtt_max_students: 10,
        qtt_meetings: 20
      })

    expect(group.body.name).toBe('Group Test')
    expect(updatedGroup.body.name).not.toBe(group.body.name)
    expect(updatedGroup.body.name).toBe('Group Updated')
    expect(group.body.id.toString()).toBe(updatedGroup.body.id.toString())
  })

  it('should delete a group', async () => {
    const deletedGroup = await request(app)
      .delete('/groups/1')

    const group = await request(app)
      .get('/groups/1')

    expect(deletedGroup.status).toBe(204)
    expect(group.body).toHaveProperty('error')
    expect(group.body.error).toBe('Content not found')
  })

  it('should list all groups', async () => {
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/groups')
        .send({
          name: 'Group1',
          description: 'Test1',
          category: 'Test1',
          qtt_min_students: 1,
          qtt_max_students: 5,
          qtt_meetings: 10
        })
    }

    const groups = await request(app)
      .get('/groups')

    expect(groups.body[0]).toHaveProperty('name')
    expect(groups.body).toHaveLength(3)
  })
})
