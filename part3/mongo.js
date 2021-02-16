const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');;
    process.exit(1);
}

const password = process.argv[2];

const url = 
`mongodb+srv://fullstack:${password}@reactnote2020app.ofv6k.mongodb.net/phonebook?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,    
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id =returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__V;
    }
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3) {

    const name = process.argv[3];
    const number = process.argv[4];
    console.log(`Name = ${name} Phone = ${number}`);    

    const person = new Person({         
        name: name, 
        number: number,
        date: new Date().toISOString(),
    });

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook` );
        mongoose.connection.close();
    });
}
else{
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {            
            console.log(person.name, person.number)
            // console.log(person);
        })
        mongoose.connection.close();
    })
}