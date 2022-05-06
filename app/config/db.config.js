module.exports = {
    HOST: 'localhost',
    USER: 'phpmyadmin',
    PASSWORD: 'P@$$word@1234',
    DB: 'paynet-staging',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idel: 10000
    }
}