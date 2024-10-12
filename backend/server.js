'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');

const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db');

//init DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors({
	origin: 'http://localhost:4200',
	credentials: true
}));
app.use(cookieParser())

//RUTAS DE LA API
app.use('/api', router)
authRoutes(router);

router.get('/', (req, res) => {
    res.send('Hello from the other side :) uwu')
});
app.use(router);

app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));