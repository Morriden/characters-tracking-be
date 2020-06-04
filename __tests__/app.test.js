const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const Character = require('../lib/Character');

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
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Morriden',
          description: 'A Drow who uses magic to help those in need.',
          level: 8,
          __v: 0
        });
      });
  });

  it('gets one character by id', async() => {

    const characterId = await Character.create({
      name: 'Morriden',
      description: 'A Drow who uses magic to help those in need.',
      level: 8,
    });

    return request(app)
      .get(`/characters/${characterId._id}`)
      .then(res => {
        expect(res.body).toEqual(
          {
            _id: expect.anything(),
            name: 'Morriden',
            description: 'A Drow who uses magic to help those in need.',
            level: 8,
            __v: 0           
          }
        );
      });

  });

  it('get a list of characters', async() => {
    await Character.create(
      {
        name: 'Morriden',
        description: 'A Drow who uses magic to help those in need.',
        level: 8,
      },
      {
        name: 'Kartanis',
        description: 'A Dragonborn paladin who praises Bahamut and protects the weak!',
        level: 8,
      }
    );

    return request(app)
      .get('/characters')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: expect.anything(),
            name: 'Morriden',
            description: 'A Drow who uses magic to help those in need.',
            level: 8,
            __v: 0 
          },
          {
            _id: expect.anything(),
            name: 'Kartanis',
            description: 'A Dragonborn paladin who praises Bahamut and protects the weak!',
            level: 8,
            __v: 0 
          }
        ]);
      });
  });

  it('updates the level of a character', async() => {
    const characterId = await Character.create(
      {
        name: 'Morriden',
        description: 'A Drow who uses magic to help those in need.',
        level: 8,
      });

    return request(app)
      .patch(`/characters/update/${characterId._id}/10`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Morriden',
          description: 'A Drow who uses magic to help those in need.',
          level: 10,
          __v: 0
        });
      });
  });

  it('deletes the character', async() => {
    const characterId = await Character.create(
      {
        name: 'Morriden',
        description: 'A drow who uses magic.',
        level: 8,
      });

    return request(app)
      .delete(`/characters/delete/${characterId._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Morriden',
          description: 'A drow who uses magic.',
          level: 8,
          __v: 0
        });
      });
  });

});
