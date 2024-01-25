const morgan = require('morgan');

morgan.token('body', (req) => {
    const body = JSON.stringify(req.body);
    return body !== '{}' ? body : '-';
});

const requestLogger = () => morgan(':method :url :status - :response-time ms :body');

const unknownEndpoint = (req, res) =>
    res.status(404).send({ error: 'unknown endpont' });

const errorHandler = (e, req, res, next) => {
    console.log('error name:', e.name);

    if (e.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (e.name === 'ValidationError') {
        return res.status(400).send({ error: e.message });
    }

    next(e);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
};
