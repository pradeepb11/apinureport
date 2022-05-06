const payoutReports = require('../models/payoutreport.model');

//// Retrieve all Tutorials from the database (with condition).

exports.findByDate = async(req, res) => {
    // res.send({
    //     message: 'Welcome to Find By Date.'
    // })
    let userList = await payoutReports.findByDate();
    console.log(userList);






};