const mongoose = require('mongoose');
const { type } = require('os');

//Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef','manager','waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
});

//Create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;

// {
//     "name": "Alice",
//     "age": 28,
//     "work": "Chef",
//     "mobile": "123-456-7890",
//     "email": "alice@example.com",
//     "address": "123 main city",
//     "salary": 60000
// }