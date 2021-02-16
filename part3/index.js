require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');
const { request, response } = require('express');

app.use(cors());

app.use(morgan((tokens, request, response) => {
        return [
            tokens.method(request, response),
            tokens.url(request, response),
            tokens.status(request, response), ' ',
            tokens.res(request, response, 'content-length'), ' - ',
            tokens['response-time'](request, response), 'ms ',             
            tokens.method(request, response) === 'POST'
                ?`${request.headers['content-type']} {name : ${request.body['name']}, number :${request.body['number']}}`
                :''       
        ]. join('')
    })
);

app.use(express.static('build'));
app.use(express.json());

app.post('/api/people', (request, response, next) => {        
    const body = request.body;   
    
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'either name or number or both are missing'
        });
    }

    const person = new Person ({        
        "name": body.name,
        "number": body.number,
        "date": new Date()
    });    

    Person.findOne({ name : body.name}).then(result => {             
        if(result) {
            Person.findByIdAndUpdate( 
                result.id, 
                { number: person.number }, { updateDate: new Date() }
             )
            .then(updatedPerson => {
                console.log(updatedPerson);
                response.status(400).send({
                    error: `${result.name} is alredy in the system so, the number was updated`
                })
            })
            .catch(error => next(error));           
        } else {                        
            person
                .save()
                .then(savedPerson => savedPerson.toJSON())
                .then(savedAndFormattedPerson => {
                    response.json(savedAndFormattedPerson)
                })
                .catch(error => next(error));    
        }
    })            
});

app.put('/api/people/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        number: body.number
    };
    Person.findByIdAndUpdate(request.params.id, person, { updateDate: new Date() })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook</h1>');
});

app.get('/info', (request, response) => {
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

app.get('/api/people', (request, response) => {
    Person.find({}).then(people => {
        response.json(people);
    });    
});

app.get('/api/people/:id', (request, response, next) => {
    Person.findById(request.params.id).
        then(person => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end()
            }            
        })
        .catch(error => next(error));
});

app.delete('/api/people/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end();
    })
    .catch(error => next(error));            
})

const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndPoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.name);
    console.log(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'This Person Was already deleted or the id is malformated' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
