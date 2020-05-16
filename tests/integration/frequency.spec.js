const request = require('supertest')
const app = require('../../src/app')

describe('Testing FrequencyController', () => {
  it('should be able to CREATE a new frequency', async () => {
    const frequency = await request(app)
      .post('/frequencies')
      .send({
        subject_id: 1,
        student_id: 1,
        class_date: '2020-05-05',
        lack: true
      })

    expect(frequency.status).toBe(200)
    expect(frequency.body).toHaveProperty('class_date')
  })

  it('should be able to UPDATE a frequency', async () => {
    const frequency = await request(app)
      .get('/frequencies/2')

    const updatedFrequency = await request(app)
      .put('/frequencies/2')
      .send({
        subject_id: 1,
        student_id: 1,
        class_date: '2020-05-10',
        lack: true
      })

    expect(frequency.body.class_date).toBe('2020-05-05')
    expect(updatedFrequency.status).toBe(200)
    expect(updatedFrequency.body.class_date).not.toBe(frequency.body.class_date)
    expect(updatedFrequency.body.id.toString()).toBe(frequency.body.id.toString())
    expect(updatedFrequency.body.class_date).toBe('2020-05-10')
  })

  it('should be able to DELETE a frequency', async () => {
    const deletedFrequency = await request(app)
      .delete('/frequencies/2')

    const frequency = await request(app)
      .get('/frequencies/2')

    expect(deletedFrequency.status).toBe(204)
    expect(frequency.body).toHaveProperty('error')
    expect(frequency.body.error).toBe('Content not found')
  })

  it('should be able to LIST ALL frequencies', async () => {
    for (let i = 1; i < 4; i++) {
      await request(app)
        .post('/frequencies')
        .send({
          subject_id: 1,
          student_id: 1,
          class_date: '2020-05-05',
          lack: true
        })
    }

    const frequencies = await request(app)
      .get('/frequencies')

    expect(frequencies.status).toBe(200)
    expect(frequencies.body).toHaveLength(4)
    expect(frequencies.body[0]).toHaveProperty('class_date')
  })
})
