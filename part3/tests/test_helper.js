const Person = require('../models/person');
const User = require('../models/user');

const initialPeople = [
  {
    name: 'Cristian Hellas',
    number: '0401-123-456',
    date: new Date(),
  },
  {
    name: 'Jose Marcos',
    number: '+55-040-123-456',
    date: new Date(),
  },
];

const nonExistingId = async () => {
  const person = new Person({ name:'Paulo Fellas', number: '0412-534-456', date: new Date() });
  await person.save();
  await person.remove();

  return person._id.toString();
}

const peopleInDb = async () => {
  const people = await Person.find({});
  return people.map(person => person.toJSON());
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialPeople,
  nonExistingId,
  peopleInDb,
  usersInDb,
}