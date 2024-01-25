const cors = require('cors');
const express = require('express');

const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware');
const personRouter = require('./routes/persons');
const Person = require('./mongo/models/person');

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger());

app.get('/info', (req, res, next) => {
    const options = {
        second: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    Person.find({})
        .then((persons) =>
            res.send(
                `<p>Phonebook has info for ${persons.length} ${
                    persons.length === 1 ? 'person' : 'people'
                }</p><p>${new Date().toLocaleString('fi-FI', options)}</p>`
            )
        )
        .catch((e) => next(e));
});
app.use('/api/persons/', personRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
