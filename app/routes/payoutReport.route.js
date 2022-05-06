module.exports = app => {

    const payoutReport = require('../controllers/payoutreport.controller');

    var router = require('express').Router();

    // Create a new Tutorial
    router.post('/', payoutReport.findByDate);

    app.use('/api/report', router);
}