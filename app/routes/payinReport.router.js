module.exports = app => {

    const payinReport = require('../controllers/payinreport.controller');

    var router = require('express').Router();

    // Create a new Tutorial
    router.post('/', payinReport.findByDate);

    // get payout success 
    router.get('/success', payinReport.retrivetodaydatasucessPayin);

    // get pauyout failure
    router.get('/failure', payinReport.retrivetodaydataFailurePayin);

    // fetch data payout monthwise
    router.get('/payinmonthReport', payinReport.getThismonthPayinamt);

    app.use('/api/payinReport', router);
}