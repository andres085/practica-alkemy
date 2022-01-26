const Sequelize = require('sequelize');

const CharacterModel = require('../models/character');
const MovieModel = require('../models/movie');
const GenreModel = require('../models/genre');
const CharacterMovieModel = require('../models/charactermovie');
const UserModel = require('../models/user');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  HOST: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
});

const Character = CharacterModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);
const Genre = GenreModel(sequelize, Sequelize);
const CharacterMovie = CharacterMovieModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Genre.hasMany(Movie);

Character.belongsToMany(Movie, {
  through: 'character_movie',
  as: 'movies',
  foreignKey: 'characterId',
});

Movie.belongsToMany(Character, {
  through: 'character_movie',
  as: 'characters',
  foreignKey: 'movieId',
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas Sincronizadas');
  }).catch((err) => { console.log('Error', err) });

module.exports = {
  Genre,
  Movie,
  Character,
  CharacterMovie,
  User
}