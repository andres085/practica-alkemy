const Sequelize = require('sequelize');

const CharacterModel = require('../models/character');
const MovieModel = require('../models/movie');
const GenreModel = require('../models/genre');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  HOST: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
});

const Character = CharacterModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);
const Genre = GenreModel(sequelize, Sequelize);

Genre.hasMany(Movie);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas Sincronizadas');
  }).catch((err) => { console.log('Error', err) });

module.exports = {
  Character,
  Movie,
  Genre, 
}