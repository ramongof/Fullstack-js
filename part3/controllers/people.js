const peopleRouter = require('express').Router();
const Person = require('../models/person');
const logger = require('../utils/logger');

peopleRouter.get('/info', (request, response) => {
  let result = '';
  Person.find({}).then(people => {
    let person = people.length;

    person > 1
      ? result = 'people'
      : result = 'person';

    response.send(
      `<div> 
         <h3> PhoneBook has info for ${person} ${result} </h3>
         <h3>${Date()}</h3>
       </div>`);
  });
});

peopleRouter.get('/', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  });
});

peopleRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id).
    then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

peopleRouter.post('/', (request, response, next) => {
  const body = request.body;

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'either name or number or both are missing'
    });
  }

  Person.findOne({ name : body.name }).then(result => {
    const person = new Person ({
      'name': body.name,
      'number': body.number,
      'date': new Date()
    });

    logger.info(person);

    if(result) {
      Person.findByIdAndUpdate(
        result.id,
        { number: person.number }, { 'runValidators': true,  context: 'query' }
      )
        .then(updatedPerson => {
          logger.info(updatedPerson);
          response.status(400).send({
            error: `${result.name} is alredy in the system so, the number was updated`
          });
        })
        .catch(error => next(error));
    } else {
      person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
          response.json(savedAndFormattedPerson);
        })
        .catch(error => next(error));
    }
  });
});

peopleRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  Person.findByIdAndUpdate(request.params.id, { number: body.number }, { 'runValidators': true,  context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

peopleRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = peopleRouter;