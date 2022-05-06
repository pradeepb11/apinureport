const { query } = require('express');
const querys = require('../config/db.config.js');

//constructor
const payoutReport = (payoutreport) => {
    this.name = payoutreport.name;
    this.amount = payoutreport.amount
}

payoutReport.findByDate = async(req, res) => {


    let sql = `SELECT * FROM  transaction`;
    const result = await querys(sql);
    console.log(req.body);
}

module.exports = payoutReport;