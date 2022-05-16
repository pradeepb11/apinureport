module.exports = app => {

    const payoutReport = require('../controllers/payoutreport.controller');

    var router = require('express').Router();

    // Create a new Tutorial
    router.post('/', payoutReport.findByDate);

    // get payout success 
    router.get('/success', payoutReport.retrivetodaydatasucessPayout);

    // get pauyout failure
    router.get('/failure', payoutReport.retrivetodaydataFailurePayout);

    // fetch data payout monthwise
    router.get('/payoutmonthReport', payoutReport.getThismonthPayoutamt);

    app.use('/api/payoutreport', router);
}