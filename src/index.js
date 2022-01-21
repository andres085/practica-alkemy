require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');

const apiRouter = require('./app/routes/api');

const app = express();

require('./app/config/db.config');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}.`);
});
