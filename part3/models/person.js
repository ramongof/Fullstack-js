const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minlength: 12
  },
  date: {
    type: Date,
    required: true
  },
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__V;
  }
});

module.exports = mongoose.model('Person', personSchema);
