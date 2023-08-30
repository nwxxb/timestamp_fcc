const request = require('supertest')
const app = require('../index.js')
const server = app.listen(process.env.port)

describe('Timestamp endpoint', () => {
  it('return now if no params given', async () => {
    const res = await request(app).get('/api')
    expect(res.status).toEqual(200)
    expect(res.headers["content-type"]).toMatch(/json/)
    expect(res.body.unix).toBeDefined()
    expect(res.body.utc).toEqual(new Date().toUTCString())
  });

  it('it works on normal date parameters', async () => {
    const res = await request(app).get('/api/2015-12-25')
    expect(res.status).toEqual(200)
    expect(res.headers["content-type"]).toMatch(/json/)
    expect(res.body.unix).toEqual(1451001600000)
    expect(res.body.utc).toEqual("Fri, 25 Dec 2015 00:00:00 GMT")
  });

  it('handle invalid date paramters', async () => {
    const res = await request(app).get('/api/datehahah')
    expect(res.status).toEqual(400)
    expect(res.headers["content-type"]).toMatch(/json/)
    expect(res.body.error).toEqual('Invalid Date')
  });

  it('it works on milisecond parameters', async () => {
    const res = await request(app).get('/api/1451001600000')
    expect(res.status).toEqual(200)
    expect(res.headers["content-type"]).toMatch(/json/)
    expect(res.body.unix).toEqual(1451001600000)
    expect(res.body.utc).toEqual("Fri, 25 Dec 2015 00:00:00 GMT")
  });
});

server.close()
