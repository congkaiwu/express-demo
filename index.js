const startDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const auth = require('./middleware/authentication');
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(logger);
app.use(auth);
app.use('/api/courses', courses);
app.use('/', home);

// process.env.NODE_ENV
// console.log(app.get('env'));
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startDebugger('Morgan enabled');
}

dbDebugger('Connected to the database...');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));