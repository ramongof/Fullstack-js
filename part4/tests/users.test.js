const supertest = require('supertest');
const mongoose = require('mongoose');
const userHelper = require('./users_helper');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcryptjs');
const User = require('../models/user');

beforeEach(async () => {  
  await User.deleteMany({name: 'test'});
  const saltRounds = 10;
  const passwordHash1 = await bcrypt.hash('1234', saltRounds);
  const passwordHash2 = await bcrypt.hash('4321', saltRounds);

  await User.insertMany(
    [     
      {
        notes: "", 
        username: "Paul", 
        name: "test", 
        passwordHash: passwordHash1
      }, 
      { 
        notes: "", 
        username: "Jhon", 
        name: "test", 
        passwordHash: passwordHash2
      }, 
    ]
  );
});

test('number of users registered', async () => {
    const result = await userHelper.usersInDb();        
    expect(result).toBe(6);
});

test('Password and Username validation', async () => {
    const saltRounds = 10;
    const passwordHash1 = await bcrypt.hash('123', saltRounds);

    const newUser = {
        notes: "", 
        username: "Pal", 
        name: "test", 
        passwordHash: passwordHash1
    }
    console.log(newUser);
    return false;
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);        
});


afterAll(() => {
  mongoose.connection.close();
});