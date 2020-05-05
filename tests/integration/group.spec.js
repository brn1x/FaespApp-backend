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
        ra_group_owner: '12345678900',
        qtt_min_students: 1,
        qtt_max_students: 5,
        qtt_meetings: 10,
        campus: 'CIC',
        semester_year: '2020/1',
        period: 'N'
      })

    expect(group.status).toBe(200)
    expect(group.body).toHaveProperty('name')
  })

  it('should update a group information', async () => {
    const group = await request(app)
      .get('/groups/2')

    const updatedGroup = await request(app)
      .put('/groups/2')
      .send({
        name: 'Group Updated',
        description: 'Description Updated',
        category: 'Category Updated',
        ra_group_owner: '12345678900',
        qtt_min_students: 10,
        qtt_max_students: 10,
        qtt_meetings: 20,
        campus: 'CIC',
        semester_year: '2020/1',
        period: 'N'
      })

    expect(group.body.name).toBe('Group Test')
    expect(updatedGroup.body.name).not.toBe(group.body.name)
    expect(updatedGroup.body.name).toBe('Group Updated')
    expect(group.body.id.toString()).toBe(updatedGroup.body.id.toString())
  })

  it('should delete a group', async () => {
    const deletedGroup = await request(app)
      .delete('/groups/2')

    const group = await request(app)
      .get('/groups/2')

    expect(deletedGroup.status).toBe(204)
    expect(group.body).toHaveProperty('error')
    expect(group.body.error).toBe('This group have been inactivated')
  })

  it('should list all groups', async () => {
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/groups')
        .send({
          name: 'Group1',
          description: 'Test1',
          category: 'Test1',
          ra_group_owner: '12345678900',
          qtt_min_students: 1,
          qtt_max_students: 5,
          qtt_meetings: 10,
          campus: 'CIC',
          semester_year: '2020/1',
          period: 'N',
          status: 'A'
        })
    }

    const groups = await request(app)
      .get('/groups')

    expect(groups.body[0]).toHaveProperty('name')
    expect(groups.body).toHaveLength(4)
  })
})
