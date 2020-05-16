const request = require('supertest')
const app = require('../../src/app')

describe('Testing GradeController', () => {
  it('should be able to CREATE a new grade', async () => {
    const grade = await request(app)
      .post('/grades')
      .send({
        agm1: 10,
        agm2: 10,
        tb1: 10,
        tb2: 10,
        subject_id: 1,
        student_id: 1
      })

    expect(grade.status).toBe(200)
    expect(grade.body).toHaveProperty('agm1')
  })

  it('should be able to UPDATE a grade', async () => {
    const grade = await request(app)
      .get('/grades/2')

    const updatedGrade = await request(app)
      .put('/grades/2')
      .send({
        agm1: 5,
        agm2: 5,
        tb1: 5,
        tb2: 5,
        subject_id: 1,
        student_id: 1
      })

    expect(grade.body.agm1).toBe(10)
    expect(updatedGrade.status).toBe(200)
    expect(updatedGrade.body.agm1).not.toBe(grade.body.agm1)
    expect(updatedGrade.body.id.toString()).toBe(grade.body.id.toString())
    expect(updatedGrade.body.agm1).toBe(5)
  })

  it('should be able to DELETE a grade', async () => {
    const deletedGrade = await request(app)
      .delete('/grades/2')

    const grade = await request(app)
      .get('/grades/2')

    expect(deletedGrade.status).toBe(204)
    expect(grade.body).toHaveProperty('error')
    expect(grade.body.error).toBe('Content not found')
  })

  it('should be able to LIST ALL grades', async () => {
    for (let i = 1; i < 4; i++) {
      await request(app)
        .post('/grades')
        .send({
          agm1: 10,
          agm2: 10,
          tb1: 10,
          tb2: 10,
          subject_id: 1,
          student_id: 1
        })
    }

    const grades = await request(app)
      .get('/grades')

    expect(grades.status).toBe(200)
    expect(grades.body).toHaveLength(4)
    expect(grades.body[0]).toHaveProperty('agm1')
  })
})
