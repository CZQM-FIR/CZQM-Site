const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const metarRoute = require('./routes/api/metar');
const stationRoute = require('./routes/api/station');
const liveControllersRoute = require('./routes/api/liveControllers');
const loginRoute = require('./routes/api/login');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/api/user');
const logoutRoute = require('./routes/api/logout');
const eventRoute = require('./routes/api/event');
const editEventRoute = require('./routes/api/editEvent');
const fileRoute = require('./routes/api/file');
const newsRoute = require('./routes/api/news');
const editNewsRoute = require('./routes/api/editNews');
const rosterRoute = require('./routes/api/roster');

// dotenv
require('dotenv').config();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Database Connected'))
    .catch(err => console.error(err));

app.use('/api/metar', metarRoute);
app.use('/api/station', stationRoute);
app.use('/api/liveControllers', liveControllersRoute);
app.use('/api/login', loginRoute);
app.use('/api/user', userRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/event', eventRoute);
app.use('/api/editevent', editEventRoute);
app.use('/api/file', fileRoute);
app.use('/api/news', newsRoute);
app.use('/api/editnews', editNewsRoute);
app.use('/api/roster', rosterRoute);
app.use(fileUpload)

app.all('*', (req, res) => {})

app.all('/api', (req, res) => {
    res.status(204).send()
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));