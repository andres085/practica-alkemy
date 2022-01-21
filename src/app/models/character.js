module.exports = (sequelize, type) => {
    return sequelize.define('characters', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: type.STRING,
        name: type.STRING,
        age: type.INTEGER,
        weight: type.FLOAT,
        story: type.TEXT,
    })
}