const request = require('supertest')
const app = require('../../src/app')

describe('Testing CategoryController', () => {
  it('should create a category', async () => {
    const category = await request(app)
      .post('/categories')
      .send({
        name: 'Test Category'
      })

    expect(category.status).toBe(200)
    expect(category.body).toHaveProperty('name')
  })

  it('should update a category', async () => {
    const category = await request(app)
      .get('/categories/2')

    const updatedCategory = await request(app)
      .put('/categories/2')
      .send({
        name: 'Updated Category'
      })

    expect(category.body.name).toBe('Test Category')
    expect(updatedCategory.status).toBe(200)
    expect(updatedCategory.body.name).not.toBe(category.body.name)
    expect(updatedCategory.body.id.toString()).toBe(category.body.id.toString())
    expect(updatedCategory.body.name).toBe('Updated Category')
  })

  it('should delete a category', async () => {
    const deletedCategory = await request(app)
      .delete('/categories/2')

    const category = await request(app)
      .get('/categories/2')

    expect(deletedCategory.status).toBe(204)
    expect(category.body).toHaveProperty('error')
    expect(category.body.error).toBe('Content not found')
  })

  it('should list all categories', async () => {
    for (let i = 1; i < 4; i++) {
      await request(app)
        .post('/categories')
        .send({
          name: `Category Test${i}`
        })
    }

    const categories = await request(app)
      .get('/categories')

    expect(categories.status).toBe(200)
    expect(categories.body).toHaveLength(4)
    expect(categories.body[0]).toHaveProperty('name')
  })
})
