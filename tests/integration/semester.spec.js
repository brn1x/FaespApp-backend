const request = require('supertest')
const app = require('../../src/app')

describe('Testing SemesterController', () => {
  it('should create a Semester', async () => {
    const semester = await request(app)
      .post('/semesters')
      .send({
        name: 'Test Semester'
      })

    expect(semester.status).toBe(200)
    expect(semester.body).toHaveProperty('name')
  })

  it('should update a semester', async () => {
    const semester = await request(app)
      .get('/semesters/2')

    const updatedSemester = await request(app)
      .put('/semesters/2')
      .send({
        name: 'Updated Semester'
      })

    expect(semester.body.name).toBe('Test Semester')
    expect(updatedSemester.status).toBe(200)
    expect(updatedSemester.body.name).not.toBe(semester.body.name)
    expect(updatedSemester.body.id.toString()).toBe(semester.body.id.toString())
    expect(updatedSemester.body.name).toBe('Updated Semester')
  })

  it('should delete a Semester', async () => {
    const deletedSemester = await request(app)
      .delete('/semesters/2')

    const semester = await request(app)
      .get('/semesters/2')

    expect(deletedSemester.status).toBe(204)
    expect(semester.body).toHaveProperty('error')
    expect(semester.body.error).toBe('Content not found')
  })

  it('should list all Semesters', async () => {
    for (let i = 1; i < 4; i++) {
      await request(app)
        .post('/semesters')
        .send({
          name: `Semester Test${i}`
        })
    }

    const semesters = await request(app)
      .get('/semesters')

    expect(semesters.status).toBe(200)
    expect(semesters.body).toHaveLength(4)
    expect(semesters.body[0]).toHaveProperty('name')
  })
})
