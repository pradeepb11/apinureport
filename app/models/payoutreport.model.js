// const { query } = require('express');
// const querys = require('../config/db.config.js');

const sql = require("./db.js");

//constructor
const payoutReport = (payoutreport) => {
    this.transaction_id = payoutreport.transaction_id;
    this.user_id = payoutreport.user_id,
    this.time_stamp = payoutreport.time_stamp;
    this.amount = payoutreport.amount
}

payoutReport.getTrastion = ({starttimestamp,endtimestamp},result) =>{
  // console.log(result)
  sql.query(`SELECT ag.user_id, ag.name, cus.mycount, cus.mySUM
  from user ag
  INNER JOIN (
  SELECT user_id,COUNT(*) AS mycount,
  SUM(amount) AS mySUM
  FROM transaction 
  WHERE time_stamp >= ${starttimestamp} AND time_stamp <= ${endtimestamp}
  GROUP BY user_id) cus
  ON cus.user_id=ag.user_id`,
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

module.exports = payoutReport;