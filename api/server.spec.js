const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

describe ('server', () => {
  beforeAll(async () => {
    await db('users').truncate();
  });

  it('runs the test', () => {
    expect(true).toBe(true);
  })

  describe('POST /api/auth/register', () => {
    it('returns 201 Created', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'chad',
          password: 'maple'
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it('returns 500 for a duplicate user', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'chad',
          password: 'maple'
        })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });

  describe('POST /api/auth/login', () => {
    it('returns 200 OK', () => {
      return request(server)
        .post('/api/auth/login')
        .send({
          username: 'chad',
          password: 'maple'
        })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('returns 401 when invalid credentials provided', () => {
        return request(server)
          .post('/api/auth/login')
          .send({
            username: 'dave',
            password: 'pass' 
          })
          .then(res => {
            expect(res.status).toBe(401);
          })
      })
    })

  describe('GET /api/jokes', () => {
    it('returns json', () => {
      return request(server)
        .post('/api/auth/login')
        .send({
          username: 'chad',
          password: 'maple'
        })
        .then(res => {
          const { token } = res.body;
          return request(server)
            .get('/api/jokes')
            .set('Authorization', token)
            .then(res => {
              expect(res.type).toMatch(/json/i);
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
    });

    it('returns 401 Unauthorized if no token provided', () => {
      return request(server)
        .get('/api/jokes')
        .then(res => {
          expect(res.status).toBe(401);
        })
    })
  })
})