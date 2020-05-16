const request = require('supertest')
const app = require('../../src/app')

describe('Testing SubjectController', () => {
  it('should be able to CREATE a subject', async () => {
    const subject = await request(app)
      .post('/subjects')
      .send({
        name: 'Subject Test',
        qtt_classes: 15,
        course_id: 1,
        status: true
      })

    expect(subject.status).toBe(200)
    expect(subject.body).toHaveProperty('name')
  })

  it('should be able to UPDATE a subject', async () => {
    const subject = await request(app)
      .get('/subjects/2')

    const updatedSubject = await request(app)
      .put('/subjects/2')
      .send({
        name: 'Subject Updated',
        qtt_classes: 15,
        course_id: 1,
        status: true
      })

    expect(subject.body.name).toBe('Subject Test')
    expect(updatedSubject.status).toBe(200)
    expect(updatedSubject.body.name).not.toBe(subject.body.name)
    expect(updatedSubject.body.id.toString()).toBe(subject.body.id.toString())
    expect(updatedSubject.body.name).toBe('Subject Updated')
  })

  it('should be able to DELETE a subject', async () => {
    const deletedSubject = await request(app)
      .delete('/subjects/2')

    const subject = await request(app)
      .get('/subjects/2')

    expect(deletedSubject.status).toBe(204)
    expect(subject.body).toHaveProperty('error')
    expect(subject.body.error).toBe('Content not found')
  })

  it('should be able to LIST ALL subjets', async () => {
    for (let i = 1; i < 4; i++) {
      await request(app)
        .post('/subjects')
        .send({
          name: `Subject ${i}`,
          qtt_classes: 15,
          course_id: 1,
          status: true
        })
    }
  })
})
