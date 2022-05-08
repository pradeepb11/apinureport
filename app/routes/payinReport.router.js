module.exports = app => {

    const payinReport = require('../controllers/payinreport.controller');

    var router = require('express').Router();

    // Create a new Tutorial
    router.post('/', payinReport.findByDate);

    app.use('/api/payinReport', router);
}