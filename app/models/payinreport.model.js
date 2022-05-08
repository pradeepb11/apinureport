// const { query } = require('express');
// const querys = require('../config/db.config.js');

const sql = require("./db.js");

//constructor
const payinReport = (payinreport) => {
    this.nupay_transaction_id = payoutreport.nupay_transaction_id;
    this.merchant_id = payoutreport.merchant_id,
    this.dnt = payoutreport.dnt;
    this.amount = payoutreport.amount
}

payinReport.getTrastion = ({starttimestamp,endtimestamp},result) =>{
  // console.log(result)
  sql.query(`SELECT ag.merchant_id, ag.name, cus.mycount, cus.mySUM
  from user ag
  INNER JOIN (
  SELECT merchant_id ,COUNT(*) AS mycount,
  SUM(amount) AS mySUM
  FROM nupay_transaction_log 
  WHERE dnt >= ${starttimestamp} AND dnt <= ${endtimestamp}
  GROUP BY merchant_id) cus
  ON cus.merchant_id=ag.merchant_id`,
    (err, res) =>{
    
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tutorials: ", res);
    result(null, res);
  })
}

module.exports = payinReport;