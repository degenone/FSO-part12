const mongoose = require('mongoose');

const NUMBER_RE = /\d{3}[\s-]\d{3}[\s-]\d{4}/;

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [
            3,
            '"{VALUE}" is too short. Valid name must be at least 3 chacaters.',
        ],
        required: true,
    },
    number: {
        type: String,
        minLength: [
            12,
            '"{VALUE}" is too short. Valid number must be at least 12 chacaters.',
        ],
        validate: {
            validator: (v) => NUMBER_RE.test(v),
            message: (props) => `${props.value} is not a valid number`,
        },
        required: true,
    },
});
personSchema.set('toJSON', {
    transform: (doc, returnObj) => {
        returnObj.id = returnObj._id;
        delete returnObj._id;
        delete returnObj.__v;
    },
});

module.exports = mongoose.model('Person', personSchema);
