const peopleRouter = require('express').Router();
const Person = require('../models/person');
const logger = require('../utils/logger');

peopleRouter.get('/info', async (request, response) => {
  let result = '';
  const people = await Person.find({});
  let person = people.length;

  person > 1
    ? result = 'people'
    : result = 'person';

  response.send(
    `<div> 
        <h3> PhoneBook has info for ${person} ${result} </h3>
        <h3>${Date()}</h3>
      </div>`
  );
});

peopleRouter.get('/', async (request, response) => {
  const people = await Person.find({});
  response.json(people);
});

peopleRouter.get('/:id', async (request, response) => {
  const person = await Person.findById(request.params.id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

peopleRouter.post('/', async (request, response) => {
  const body = request.body;

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'either name or number or both are missing'
    });
  }

  const result = await Person.findOne({ name : body.name });
  const person = new Person ({
    'name': body.name,
    'number': body.number,
    'date': new Date()
  });

  logger.info(person);

  if(result) {
    const updatedPerson = await Person.findByIdAndUpdate(
      result.id,
      { number: person.number }, { 'runValidators': true,  context: 'query' }
    );
    logger.info(updatedPerson);
    response.status(400).send({
      error: `${result.name} is alredy in the system so, the number was updated`
    });
  } else {
    const savedPerson = await person.save();
    const savedAndFormattedPerson = await savedPerson.toJSON();
    response.json(savedAndFormattedPerson);
  };
});

peopleRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const updatedPerson = await Person.findByIdAndUpdate(request.params.id, { number: body.number }, { 'runValidators': true,  context: 'query' });
  response.json(updatedPerson);
});

peopleRouter.delete('/:id', async (request, response) => {
  await Person.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = peopleRouter;