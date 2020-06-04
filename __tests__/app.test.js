const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const Character = require('../lib/models/Character');

describe('app routes', () => {
  const mongo = new MongoMemoryServer();
  beforeAll(() => {
    return mongo.getUri()
      .then(uri => mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }));
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new character', () => {
    return request(app)
      .post('/characters')
      .send({
        name: 'Morriden',
        description: 'A Drow who uses magic to help those in need.',
        level: 8
      })
      .then(res => {
        expect.res.body.toEqual({
          _id: expect.anything(),
          name: 'Morriden',
          description: 'A Drow who uses magic to help those in need.',
          level: 8,
          __v: 0
        });
      });
  });


});
