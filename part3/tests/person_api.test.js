const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Person = require('../models/person');

beforeEach(async () => {
  await Person.deleteMany({});
  await Person.insertMany(helper.initialPeople);
});

describe('when there is initially some people saved', () => {
  test('People are returned as json', async () => {
    await api
      .get('/api/people')
      .expect(200)
      .expect("Content-Type", /application\/json/);

  });

  test('all people are returned', async () => {
    const response = await api.get('/api/people');

    expect(response.body).toHaveLength(helper.initialPeople.length);
  });

  test('a specific person is within the returned people', async () => {
    const response = await api.get('/api/people');
    const people = ["Cristian Hellas", "Jose Marcos"];
    const name = response.body.map(r => r.name);
    expect(name).toEqual(people);
  });
});

describe('viewing a specific person', () => {
  test('succeds with a valid id' , async () => {
    const peopleAtStart = await helper.peopleInDb();

    const personToView = peopleAtStart[0];

    const resultPerson = await api
      .get(`/api/people/${personToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedPersonToView = JSON.parse(JSON.stringify(personToView));

    expect(resultPerson.body).toEqual(processedPersonToView);
  });

  test('Fails with statuscode 404 if person does not exist' , async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api
      .get(`/api/people/${validNonexistingId}`)
      .expect(404);
  });

  test('fails with statuscode 400, for invalid ID', async () => {
    const invalidId = '12lk3j1lk23j23k1jl2j3';

    await api
      .get(`/api/people/${invalidId}`)
      .expect(400);
  });

  test('changing number of a valid person', async () => {
    const peopleAtStart = await helper.peopleInDb();
    const validId = peopleAtStart[0];
    const newNumber = '0983-123-345';
    const updatedPerson = {
      name: 'Cristian Hellas',
      number: newNumber,
      date: new Date(),
    };

    await api
      .put(`/api/people/${validId.id}`)
      .send(updatedPerson)
      .expect(200);

    const peopleAtEnd = await helper.peopleInDb();
    const numberUpdated = peopleAtEnd.map(r => r.number).find(r => r.id = validId.id);
    expect(numberUpdated).toEqual('0983-123-345');
  });
});


describe('Addition of a new person', () => {
  test('succeds with valid data', async () => {
    const newPerson = {
      name: 'Charles Junior',
      number: '0123-123-456',
      date: new Date(),
    };

    await api
      .post('/api/people')
      .send(newPerson)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const peopleAtEnd = await helper.peopleInDb();
    expect(peopleAtEnd).toHaveLength(helper.initialPeople.length + 1);

    const content = await peopleAtEnd.map(r => r.name);
    expect(content[content.length -1]).toContain("Charles Junior");
  });

  test('Fails with status code 400 if data invalid', async () => {
    const newPerson = {
      name: 'Jonnas',
    }

    await api
      .post('/api/people')
      .send(newPerson)
      .expect(400);

    const peopleAtEnd = await helper.peopleInDb();

    expect(peopleAtEnd).toHaveLength(helper.initialPeople.length);
  });
});

describe('Deletion of a person', () => {
  test('a person can be deleted', async () => {
    const peopleAtStart = await helper.peopleInDb();
    const personToDelete = peopleAtStart[0];

    await api
      .delete(`/api/people/${personToDelete.id}`)
      .expect(204);

    const peopleAtEnd = await helper.peopleInDb();
  
    expect(peopleAtEnd).toHaveLength(helper.initialPeople.length - 1);
  
    const names = peopleAtEnd.map(r => r.name);

    expect(names).not.toContain(`${personToDelete.name}`);
  });
});

afterAll(() => {
  mongoose.connection.close();
});