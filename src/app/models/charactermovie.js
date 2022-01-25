module.exports = (sequelize, type) => {
    return sequelize.define('character_movie', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        characterId: {
            type: type.INTEGER,
        },
        movieId: {
            type: type.INTEGER,
        },
    })
}