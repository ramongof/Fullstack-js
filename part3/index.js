const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

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

app.use(express.json());

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-1234567",
        "date": "2020-10-28T18:35:34.091Z"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "date": "2020-01-28T18:35:34.091Z"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "date": "2020-05-28T18:35:34.091Z"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "date": "2020-10-08T14:35:34.091Z"
    }
];

app.post('/api/persons', (request, response) => {        
    const body = request.body;
    // console.log(body);
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'either name or number or both are missing'
        });
    }

    if(persons.find(v => v.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        "id": Math.trunc(Math.random() * Date.now()),
        "name": body.name,
        "number": body.number,
        "date": new Date()
    }
    
    persons = persons.concat(person);    
    response.json(person);
});

app.put('/api/persons/:id', (request, response) => {
    const body = request.body;
    const id = Number(request.params.id);     
    const person = {
        "id": id,
        "name": body.name,
        "number": body.number,
        "date": new Date()
    }                 
    response.json(person);    
});

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook</h1>');
});

app.get('/info', (request, response) => {
    let result = ''
    persons.length > 1
        ? result = 'people'
        : result = 'person';

    response.send(
        `<div> 
            <h3> PhoneBook has info for ${persons.length} ${result} </h3>
            <h3>${Date()}</h3>
        </div>`);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);    
    const person = persons.find(person => {
        console.log(person.id, typeof person.id, id, typeof id, person.id === id);
        return person.id === id
    });

    if(person){
        response.json(person);
    } else {
        response.status(404).end();
    }    
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);    
    response.status(204).end();
})

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
