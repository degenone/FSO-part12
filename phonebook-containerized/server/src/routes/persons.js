const Person = require('../mongo/models/person');

const personsRouter = require('express').Router();


personsRouter.get('/', (req, res, next) => {
    Person.find({})
        .then((persons) => res.json(persons))
        .catch((e) => next(e));
});

personsRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => res.json(person))
        .catch((e) => next(e));
});

personsRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch((e) => next(e));
});

personsRouter.post('/', (req, res, next) => {
    const body = req.body;
    const person = new Person({
        name: body.name,
        number: body.number,
    });
    person
        .save()
        .then((newPerson) => res.json(newPerson))
        .catch((e) => next(e));
});

personsRouter.put('/:id', (req, res, next) => {
    const { name, number } = req.body;
    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        {
            new: true,
            runValidators: true,
            context: 'query',
        }
    )
        .then((updatedPerson) => res.json(updatedPerson))
        .catch((e) => next(e));
});

module.exports = personsRouter;
