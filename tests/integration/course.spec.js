const request = require('supertest')
const app = require('../../src/app')

describe('Testing CourseControllers', () => {
  it('should be able to CREATE a Course', async () => {
    const course = await request(app)
      .post('/courses')
      .send({
        name: 'Course Test',
        status: 'A'
      })

    expect(course.status).toBe(200)
    expect(course.body).toHaveProperty('name')
  })

  it('should be able to UPDATE a Course', async () => {
    const course = await request(app)
      .get('/courses/2')

    const updatedCourse = await request(app)
      .put('/courses/2')
      .send({
        name: 'Course Updated',
        status: 'A'
      })

    expect(course.body.name).toBe('Course Test')
    expect(updatedCourse.status).toBe(200)
    expect(updatedCourse.body.name).not.toBe(course.body.name)
    expect(updatedCourse.body.id.toString()).toBe(course.body.id.toString())
    expect(updatedCourse.body.name).toBe('Course Updated')
  })

  it('should be able to DELETE a Course', async () => {
    const deletedCourse = await request(app)
      .delete('/courses/2')

    const course = await request(app)
      .get('/courses/2')

    expect(deletedCourse.status).toBe(204)
    expect(course.body).toHaveProperty('error')
    expect(course.body.error).toBe('Content not found')
  })

  it('should be able to LIST ALL Courses', async () => {
    for (let i = 1; i < 4; i++) {
      await request(app)
        .post('/courses')
        .send({
          name: `Course ${i}`,
          status: 'A'
        })
    }

    const courses = await request(app)
      .get('/courses')

    expect(courses.status).toBe(200)
    expect(courses.body).toHaveLength(4)
    expect(courses.body[0]).toHaveProperty('name')
  })
})
