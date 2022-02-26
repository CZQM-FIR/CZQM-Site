const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const metarRoute = require('./routes/api/metar');
const stationRoute = require('./routes/api/station');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json())

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Database Connected'))
    .catch(err => console.log(err));

app.use('/api/metar', metarRoute);
app.use('/api/station', stationRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));