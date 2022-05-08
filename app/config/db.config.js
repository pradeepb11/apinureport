// module.exports = {
//     HOST: 'localhost',
//     USER: 'root',
//     PASSWORD: '',
//     DB: 'paynet-staging',
//     dialect: 'mysql',
//     pool: {
//         min: 0,
//         max: 5,
//         acquire: 30000,
//         idel: 10000
//     }
// }

module.exports = {
    HOST: 'test-paynet-read.c0k0amztd6hy.ap-south-1.rds.amazonaws.com',
    USER: 'testpaynet',
    PASSWORD: 'paynet-test-db-instance202001',
    DB: 'paynet_prod',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idel: 10000
    }
}