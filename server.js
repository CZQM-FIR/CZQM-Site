const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const metarRoute = require('./routes/api/metar');
const stationRoute = require('./routes/api/station');
const controllersRoute = require('./routes/api/controllers');
const authRoute = require('./routes/api/login');
const cookieParser = require('cookie-parser');

// dotenv
require('dotenv').config();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(cookieParser());

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Database Connected'))
    .catch(err => console.log(err));

app.use('/api/metar', metarRoute);
app.use('/api/station', stationRoute);
app.use('/api/controllers', controllersRoute);
app.use('/api/auth', authRoute);

app.all('/api', (req, res) => {
    res.status(204).send()
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));