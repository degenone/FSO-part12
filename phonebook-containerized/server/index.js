require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const URL = process.env.MONGODB_URL;

mongoose.set('strictQuery', false);

console.log('connecting...');

mongoose
    .connect(URL)
    .then(() => console.log('Connected to mongoDB.'))
    .catch((e) => console.log('[ERR] mongoDB connection failed', e.message));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
