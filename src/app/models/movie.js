module.exports = (sequelize, type) => {
    return sequelize.define('movies', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: type.STRING,
        title: type.STRING,
        creation_date: type.DATE,
        rate: type.INTEGER
    })
}