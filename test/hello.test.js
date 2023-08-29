const request = require('supertest')
const app = require('../index.js')
describe('Hello endpoint', () => {
  it('should say hello world', async () => {
    const res = await request(app).get('/api/hello')
    expect(res.status).toEqual(200)
    console.log('============')
    console.log(res.headers)
    console.log('============')
    expect(res.headers["content-type"]).toMatch(/json/)
    expect(res.body).toHaveProperty('greeting')
    expect(res.body.greeting).toMatch(/hello\s*world/)
  });
});
