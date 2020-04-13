const request = require('supertest')
const app = require('../../src/app')

describe('Testing StudentsController', () => {
  it('should create a new Student', async () => {
    const student = await request(app)
      .post('/students')
      .send({
        ra: '12345678900',
        name: 'Student Test'
      })

    expect(student.body).toHaveProperty('name')
    expect(student.body).toHaveProperty('ra')
    expect(student.body.ra).toHaveLength(11)
  })

  it('should updated a student information', async () => {
    const student = await request(app)
      .get('/students/1')

    const updatedStudent = await request(app)
      .put('/students/1')
      .send({
        ra: '12345678900',
        name: 'Updated Student'
      })

    expect(student.body.name).toBe('Student Test')
    expect(updatedStudent.body.name).not.toBe(student.body.name)
    expect(updatedStudent.body.name).toBe('Updated Student')
    expect(student.body.id.toString()).toBe(updatedStudent.body.id.toString())
  })

  it('should delete a student', async () => {
    const deletedStudent = await request(app)
      .delete('/students/1')

    const student = await request(app)
      .get('/students/1')

    expect(deletedStudent.status).toBe(204)
    expect(student.body).toHaveProperty('error')
    expect(student.body.error).toBe('Content not found')
  })

  it('should list all students', async () => {
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/students')
        .send({
          ra: Math.floor(Math.random() * 100000000000).toString(),
          name: 'Student Generated'
        })
    }

    const students = await request(app)
      .get('/students')

    expect(students.body[0]).toHaveProperty('name')
    expect(students.body).toHaveLength(3)
  })
})
